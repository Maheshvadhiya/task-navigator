import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { watchListStyle } from './style';
import DeleteIcon from '../../icons/delete-icon';
import EditIcon from '../../icons/edit-icon';
import { theme } from '../../constant/theme';
interface WatchListProps {
  title?: string;
  status?: string;
  onPress?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

const TodoListComp: React.FC<WatchListProps> = ({
  title,
  status,
  onPress,
  onDelete,
  onEdit
}) => {
  return (
    <Pressable style={watchListStyle.container} onPress={onPress}>
      <View style={watchListStyle.shadowView}>
        <View style={{ width: '100%', gap: 3 }}>
          <Text style={watchListStyle.text} numberOfLines={2}>
            {title}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[watchListStyle.text, { fontSize: 14, color: status === 'pending' ? 'orange' : 'green' }]}>
              {status}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <TouchableOpacity onPress={onDelete}>
                <DeleteIcon height={25} width={25} color={theme.RED_COLOR} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onEdit}>
                <EditIcon height={20} width={20} color={'green'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default React.memo(TodoListComp);