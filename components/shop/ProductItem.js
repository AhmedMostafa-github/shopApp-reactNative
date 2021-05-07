import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import Card from "../UI/Card";

const ProductItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect} activeOpacity={0.8}>
      <Card style={styles.product}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.item.imageUrl }} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{props.item.title}</Text>
          <Text style={styles.price}>${props.item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>{props.children}</View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
});

export default ProductItem;
