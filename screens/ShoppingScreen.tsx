import {Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList, RouteNames} from '../routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList>;

const ShoppingScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>Shopping</Text>
      {/* 버튼 */}
      <TouchableOpacity onPress={() => navigation.navigate(RouteNames.BROWSER)}>
        <Text>Go To Browser</Text>
      </TouchableOpacity>
      <MaterialCommunityIcons name="shopping" size={24} color="black" />
    </View>
  );
};

export default ShoppingScreen;
