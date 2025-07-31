import React, {useEffect, useState} from 'react';
import {StaticScreenProps} from '@react-navigation/native';
import {Text, XStack} from 'tamagui';
import {Wrapper} from '../../lib/Wrapper';
import {Button} from 'tamagui';
import {Plus} from '@tamagui/lucide-icons';
import {NewOrderSheet} from '../../components/dealer/sheets/NewOrderSheet';
import {Baseselect} from '../../lib/BaseSelect';
import {BaseName} from '../../types/product/common';
import {FlatList} from 'react-native';
import {
  BaseCard,
  BaseProfilesCard,
} from '../../components/dealer/cards/BaseProfilesCard';
import {getApiBaseUrl} from '../../utils/auth/baseAPI';
type DealerDashboardParamProp = StaticScreenProps<{}>;
const DealerDashboard = ({route}: DealerDashboardParamProp) => {
  const [openBaseList, setOpenBaseList] = useState<boolean>(false);
  const [base, setBase] = useState<keyof BaseName | null>(null);
  const [openBaseSheet, setOpenBaseSheet] = useState<boolean>(false);
  const [baseList, setBaseList] = useState<BaseCard[]>();

  useEffect(() => {
    const fetchBaseProfiles = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/baseProfiles`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        if (result) {
          setBaseList(result.data);
          console.log('These are the Base Profiles:', result.data);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Base Profile Error', error.message);
        } else {
          console.error('Some Error', error);
        }
      }
    };

    fetchBaseProfiles();
  }, []);

  const handleBaseSheet = (baseName: keyof BaseName) => {
    console.log('reached handleSheet', baseName);
    setBase(prev => (prev = baseName));
    setTimeout(() => {
      setOpenBaseSheet(true);
    }, 100);
  };
  return (
    <Wrapper>
      <FlatList
        data={baseList}
        style={{height: '100%'}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <BaseProfilesCard base={item} handleBaseSheet={handleBaseSheet} />
        )}
        keyExtractor={item => item.code}
        contentContainerStyle={{
          display: 'flex',
          gap: 20,
        }}
      />
      <Button
        themeInverse
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        borderBottomLeftRadius={20}
        borderBottomRightRadius={20}
        size="$3.5"
        position="absolute"
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: 100,
          elevation: 4,
        }}
        hoverStyle={{bg: '$blue9'}}
        pressStyle={{bg: 'darkgrey'}}
        onPress={() => setOpenBaseList(open => !open)}>
        <XStack style={{alignItems: 'center'}} gap="$1">
          <Plus size={16} />
          <Text>Order</Text>
        </XStack>
      </Button>
      {openBaseList && (
        <Baseselect
          open={openBaseList}
          setOpen={setOpenBaseList}
          openAccessorySheet={handleBaseSheet}
        />
      )}
      {base && openBaseSheet ? (
        <NewOrderSheet
          open={openBaseSheet}
          setOpen={setOpenBaseSheet}
          baseKey={base}
        />
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

export default DealerDashboard;
