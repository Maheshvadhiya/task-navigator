import { View, Text } from 'react-native';
import React, { forwardRef } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { theme } from '../../constant/theme';
import { selectBoxStyle } from './style';
import SearchIcon from '../../icons/search-icon';
import DownIcon from '../../icons/down-icon';

//This is the select box component, which is used wherever a form has a select box.
const SelectBoxComp = forwardRef(
  (
    {
      label,
      data,
      defaultValue,
      title,
      onSelect,
      icon,
      dropdownHeight,
      selectBoxButtonStyle,
      disabled,
      textContainer,
      textStyle,
      not_search,
      containerStyle,
      labelStyle,
      starRequired,
    }: any,
    ref: any,
  ) => {
    const keyValue = defaultValue ? defaultValue.toString() : 'empty';
    const ITEM_HEIGHT = 48;
    const MAX_DROPDOWN_HEIGHT = 250;
    const MIN_DROPDOWN_HEIGHT = 100;

    const calculatedHeight = Math.min(
      Math.max((data?.length || 0) * ITEM_HEIGHT, MIN_DROPDOWN_HEIGHT),
      MAX_DROPDOWN_HEIGHT,
    );

    return (
      <View style={[selectBoxStyle.container, { ...containerStyle }]}>
        {label && (
          <Text style={[selectBoxStyle.label, { ...labelStyle }]}>
            {label} {starRequired && <Text style={{ color: 'red' }}>*</Text>}
          </Text>
        )}
        <SelectDropdown
          key={keyValue}
          disableAutoScroll={true}
          data={data || []}
          onSelect={(selectedItem, index) => {
            if (onSelect) {
              onSelect(selectedItem, index);
            }
          }}
          ref={ref}
          search={not_search ? undefined : true}
          searchPlaceHolder="Search..."
          searchInputStyle={{
            borderBottomWidth: 0.5,
            borderColor: theme.DARK_BLACK_COLOR,
            paddingHorizontal: 10,
            backgroundColor: theme.WHITE_COLOR,
          }}
          searchPlaceHolderColor={theme.DARK_BLACK_COLOR}
          searchInputTxtStyle={{
            color: theme.BLACK_COLOR,
          }}
          renderSearchInputLeftIcon={() => !not_search && <SearchIcon />}
          renderButton={selectedItem => (
            <View
              style={[
                selectBoxStyle.selectBox,
                { ...selectBoxButtonStyle },
                disabled && { backgroundColor: '#f2f2f2', opacity: 0.6 },
              ]}
            >
              <View
                style={[
                  selectBoxStyle.selectBoxTextContainer,
                  { ...textContainer },
                ]}
              >
                {icon}
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    selectBoxStyle.selectBoxText,
                    {
                      color: selectedItem
                        ? theme.DARK_BLACK_COLOR
                        : theme.PLACE_HOLDER_COLOR,
                    },
                    { ...textStyle },
                  ]}
                >
                  {selectedItem || title}
                </Text>
              </View>
              <DownIcon />
            </View>
          )}
          defaultValue={defaultValue}
          dropdownStyle={{
            borderRadius: 5,
            height: dropdownHeight ?? calculatedHeight,
            padding: 5,
            backgroundColor: theme.WHITE_COLOR,
          }}
          disabled={disabled}
          renderItem={(item, _, isSelected) => (
            <View
              style={[
                selectBoxStyle.itemList,
                {
                  backgroundColor: isSelected ? 'lightgray' : theme.WHITE_COLOR,
                },
              ]}
            >
              <Text style={selectBoxStyle.itemListText}>{item}</Text>
            </View>
          )}
        />
      </View>
    );
  },
);

export default SelectBoxComp;
