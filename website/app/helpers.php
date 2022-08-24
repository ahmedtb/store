<?php

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


/**
 * store base64 png image file
 *
 * @param  string  $base64_image: encodeded base64 image
 * @return string png file name
 */
function storeBase64PngFile($base64_image)
{
    $imageName = Str::random(20) . '.' . 'png';
    Storage::put('public/' . $imageName, base64_decode($base64_image));
    $path = 'storage/' . $imageName;
    return $path;
}

/**
 * delete file in the public/storage linked to storage/public
 *
 * @param  string  $path: format => storage/$filename
 * @return bool if delete is done or not
 */
function deletePublicFile($path)
{
    $pieces  = explode("storage/", $path);
    $fileName = $pieces[1];
    return Storage::delete('public/' . $fileName);
}

function fileExtension($s)
{
    $n = strrpos($s, ".");
    return ($n === false) ? "" : substr($s, $n + 1);
}

function isValidBase64($base64)
{
    $n = strpos($base64, ",");
    $data =  ($n === false) ? "" : substr($base64, $n + 1);
    return base64_encode(base64_decode($data)) === $data;
}

function getBase64DefaultImage()
{

    $paths = [
        base_path('assets/doctors-appointment.jpg'),
        base_path('assets/depositphotos.jpg'),
        base_path('assets/african_holding.jpg'),
        base_path('assets/default_customer.jpg'),
    ];
    $randomPath = $paths[array_rand($paths)];
    $fileExtention = fileExtension($randomPath);
    // dd($fileExtention);
    return 'data:image/' . $fileExtention . ';base64,' . base64_encode(file_get_contents($randomPath));
}

function randomCountry()
{
    $countries = ['ليبيا', 'تونس'];

    return $countries[random_int(0, 1)];
}

    
function rand_float($st_num = 0, $end_num = 1, $mul = 1000000)
{
    if ($st_num > $end_num) return false;
    return mt_rand($st_num * $mul, $end_num * $mul) / $mul;
}
