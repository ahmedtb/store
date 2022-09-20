<?php

namespace App\Models;

use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use App\Filters\ActivityLogFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\Activitylog\Contracts\Activity as ActivityContract;

class ActivityLog extends Model implements ActivityContract
{
    public $guarded = [];

    protected $casts = [
        'properties' => 'collection',
    ];

    public function __construct(array $attributes = [])
    {
        if (!isset($this->connection)) {
            $this->setConnection(config('activitylog.database_connection'));
        }

        if (!isset($this->table)) {
            $this->setTable(config('activitylog.table_name'));
        }

        parent::__construct($attributes);
    }

    public function subject(): MorphTo
    {
        if (config('activitylog.subject_returns_soft_deleted_models')) {
            return $this->morphTo()->withTrashed();
        }

        return $this->morphTo();
    }

    public function causer(): MorphTo
    {
        return $this->morphTo();
    }

    public function getExtraProperty(string $propertyName)
    {
        return Arr::get($this->properties->toArray(), $propertyName);
    }

    public function changes(): Collection
    {
        if (!$this->properties instanceof Collection) {
            return new Collection();
        }

        return $this->properties->only(['attributes', 'old']);
    }

    public function getChangesAttribute(): Collection
    {
        return $this->changes();
    }

    public function scopeInLog(Builder $query, ...$logNames): Builder
    {
        if (is_array($logNames[0])) {
            $logNames = $logNames[0];
        }

        return $query->whereIn('log_name', $logNames);
    }

    public function scopeCausedBy(Builder $query, Model $causer): Builder
    {
        return $query
            ->where('causer_type', $causer->getMorphClass())
            ->where('causer_id', $causer->getKey());
    }

    public function scopeForSubject(Builder $query, Model $subject): Builder
    {
        return $query
            ->where('subject_type', $subject->getMorphClass())
            ->where('subject_id', $subject->getKey());
    }


    public function scopeFilter($query, ActivityLogFilters $filters)
    {
        return $filters->apply($query);
    }

    public function scopeOrderCreatedActivities($query)
    {
        return $query->where('description', 'created')->where('subject_type', "App\Models\Order");
    }

    public function scopeOrderOrderedActivities($query)
    {
        return $query->where('description', 'updated')
            ->where('subject_type', "App\Models\Order")
            ->whereJsonDoesntContain('properties->old->status', 'ordered')
            ->whereJsonContains('properties->attributes->status', 'ordered');
    }

    public function scopeOrderAcceptedActivities($query)
    {
        return $query->where('description', 'updated')
            ->where('subject_type', "App\Models\Order")
            ->whereJsonDoesntContain('properties->old->status', 'accepted')
            ->whereJsonContains('properties->attributes->status', 'accepted');
    }
    
    public function scopeOrderRejectedActivities($query)
    {
        return $query->where('description', 'updated')
            ->where('subject_type', "App\Models\Order")
            ->whereJsonDoesntContain('properties->old->status', 'rejected')
            ->whereJsonContains('properties->attributes->status', 'rejected');
    }
        
    public function scopeOrderPaidActivities($query)
    {
        return $query->where('description', 'updated')
            ->where('subject_type', "App\Models\Order")
            ->whereJsonDoesntContain('properties->old->status', 'paid')
            ->whereJsonContains('properties->attributes->status', 'paid');
    }        
}