import React from 'react'
import {TouchableOpacity,View,Image,StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    home:{
      width: 30,
      height: 30,
      borderRadius: 2,
    }
  });

const Footer=({onPress})=>{
    return(
        <TouchableOpacity onPress={onPress}>
            <View>
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/ultraviolet/40/000000/home--v1.png',
                    }}
                    style={styles.home}> 
                  </Image>
            </View>
        </TouchableOpacity>
    )
};

export default Footer;