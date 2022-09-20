import React from 'react'
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { api, getPaginationParams } from '../urls'
import { Image } from 'react-native';
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
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <ScrollView>

        {
          productsPagination?.data?.map((product, index) => {
            return <View key={index} >
              <Image source={{ uri: api.productImage(product.id) }}
                style={{ width: 200, height: 200 }}

              />
              <View>
                <Text>{product.name}</Text>
                <Text>{product.category?.name}</Text>
                <Text>{product.price}</Text>
              </View>
            </View>
          })
        }
      </ScrollView> */}
      <View style={{ padding: 10 }}>

        <ScrollPaginator
          // log='fetch products'
          apiCall={fetch}
          renderItem={(itemData: ListRenderItemInfo<product>) => <View key={itemData.index}
            style={{ flexDirection: 'row', padding: 10 }}
          >
            <Image source={{ uri: api.productImage(itemData.item.id) }}
              style={{ width: 100, height: 100 }}

            />
            <View>
              <Text>{itemData.item.name}</Text>
              <Text>{itemData.item.category?.name}</Text>
              <Text>{itemData.item.price}</Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
