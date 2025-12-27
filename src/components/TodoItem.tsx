import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Todo } from '../interfaces';

interface Props {
  todo: Todo;
  onToggle: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: Props) => {
  return (
    <View style={styles.card}>
      {/* Si tiene foto, la mostramos */}
      {todo.photoUri && (
        <Image source={{ uri: todo.photoUri }} style={styles.image} />
      )}

      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, todo.completed && styles.completedText]}>
            {todo.title}
          </Text>
          <Text style={styles.date}>
             {new Date(todo.createdAt || Date.now()).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.actions}>
          {/* Botón Completar */}
          <TouchableOpacity 
            onPress={() => onToggle(todo.id, todo.completed)}
            style={[styles.btn, styles.checkBtn, todo.completed && styles.btnActive]}
          >
            <Ionicons 
              name={todo.completed ? "checkmark-circle" : "ellipse-outline"} 
              size={24} 
              color={todo.completed ? "green" : "#ccc"} 
            />
          </TouchableOpacity>

          {/* Botón Eliminar */}
          <TouchableOpacity 
            onPress={() => onDelete(todo.id)}
            style={[styles.btn, styles.deleteBtn]}
          >
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // Espacio entre botones
  },
  btn: {
    padding: 5,
  },
  checkBtn: {},
  btnActive: {},
  deleteBtn: {},
});