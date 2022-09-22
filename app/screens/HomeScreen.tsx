import React from 'react'
import { StyleSheet } from 'react-native';
import { api, getPaginationParams } from '../urls'
import { Image, Text, View } from 'react-native';
import ScrollPaginator from '../components/ScrollPaginator'
import { ListRenderItemInfo } from 'react-native'

export default function HomeScreen() {

  const [productsPagination, setproductsPagination] = React.useState<pagination<products>>()
  let [q, setQuery] = React.useState<string>();
  let [category_id, setcategory_id] = React.useState<number>();

  function fetch(params) {
    return api.productsIndex({ ...getPaginationParams(productsPagination), q: q, category_id: category_id, ...params, with: 'category' });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>النتائج</Text>

      <View style={{ padding: 10 }}>

        <ScrollPaginator
          // log='fetch products'
          apiCall={fetch}
          renderItem={(itemData: ListRenderItemInfo<product>) => <View
            key={itemData.index}
            style={{ flexDirection: 'row', padding: 10, borderWidth: 0.2, margin: 5, borderRadius: 5 }}
          >
            <Image source={{ uri: api.productImage(itemData.item.id) }}
              style={{ width: 150, height: 150 }}
            />
            <View style={{ margin: 10, flexShrink: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', }}>{itemData.item.name}</Text>
              <Text>{itemData.item.price} دينار</Text>
            </View>
          </View>}
        />
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 100,
    backgroundColor: 'white',
    padding: 5
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
