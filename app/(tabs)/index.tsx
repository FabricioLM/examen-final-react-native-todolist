import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TodoItem } from '../../src/components/TodoItem';
import { useTodos } from '../../src/hooks/useTodos';
import { imageService } from '../../src/services/imageService';

export default function HomeScreen() {

  // 👇 márgenes seguros (notch, barra inferior, etc.)
  const insets = useSafeAreaInsets();

  const { todos, isLoading, error, refreshTodos, addTodo, toggleTodo, deleteTodo } = useTodos();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 📸 tomar o elegir foto
  const pickImage = async (useCamera: boolean) => {
    let result;
    if (useCamera) {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permiso denegado", "Necesitamos acceso a la cámara.");
        return;
      }
      result = await ImagePicker.launchCameraAsync({ quality: 0.5, allowsEditing: true });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({ quality: 0.5, allowsEditing: true });
    }

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // 💾 guardar tarea
  const handleSave = async () => {
    if (!newTitle.trim()) {
      Alert.alert('Falta el título', 'Escribe qué tienes que hacer.');
      return;
    }

    try {
      setIsSubmitting(true);

      let photoUrl = undefined;

      if (selectedImage) {
        const uploadResult = await imageService.upload(selectedImage);
        photoUrl = uploadResult.url;
      }

      await addTodo(newTitle, photoUrl);

      setNewTitle('');
      setSelectedImage(null);
      setModalVisible(false);

    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar. Revisa tu conexión.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.content}>
        {isLoading && !modalVisible ? (
          <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TodoItem todo={item} onToggle={toggleTodo} onDelete={deleteTodo} />
            )}
            contentContainerStyle={todos.length === 0 ? styles.listEmpty : styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="clipboard-outline" size={80} color="#ccc" />
                <Text style={styles.emptyTitle}>¡Todo limpio!</Text>
                <Text style={styles.emptySubtitle}>No tienes tareas pendientes.</Text>
                <Text style={styles.emptyHint}>Presiona el botón + para empezar</Text>
              </View>
            }
            refreshing={isLoading}
            onRefresh={refreshTodos}
          />
        )}
      </View>

      {/* 👉 FAB CON SAFE AREA */}
      <TouchableOpacity
        style={[
          styles.fab,
          { bottom: insets.bottom + 70 }   // ⬅️ aquí usamos safe area
        ]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.9}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Nueva Tarea</Text>

            <TextInput
              style={styles.input}
              placeholder="Ej: Grabar video del examen"
              value={newTitle}
              onChangeText={setNewTitle}
            />

            {selectedImage && (
              <View>
                <Image source={{ uri: selectedImage }} style={styles.previewImage} />
                <TouchableOpacity onPress={() => setSelectedImage(null)}>
                  <Text style={{ color: 'red', textAlign: 'center' }}>Eliminar foto</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.imageButtons}>
              <TouchableOpacity style={styles.mediaBtn} onPress={() => pickImage(true)}>
                <Ionicons name="camera" size={20} color="white" />
                <Text style={styles.mediaText}>Cámara</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.mediaBtn, { backgroundColor: '#5856D6' }]} onPress={() => pickImage(false)}>
                <Ionicons name="images" size={20} color="white" />
                <Text style={styles.mediaText}>Galería</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={isSubmitting}>
                {isSubmitting
                  ? <ActivityIndicator color="white" />
                  : <Text style={styles.saveText}>Guardar tarea</Text>}
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  content: { flex: 1 },

  listContent: { padding: 16, paddingBottom: 120 },
  listEmpty: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },

  emptyContainer: { alignItems: 'center' },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  emptySubtitle: { fontSize: 16, color: '#666' },
  emptyHint: { fontSize: 14, color: '#999', marginTop: 8 },

  fab: {
    position: 'absolute',
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  modalHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },

  input: { backgroundColor: '#f0f0f0', borderRadius: 8, padding: 12, marginBottom: 10 },

  previewImage: { width: '100%', height: 160, borderRadius: 8, marginVertical: 8 },

  imageButtons: { flexDirection: 'row', gap: 10, marginVertical: 8 },
  mediaBtn: { flex: 1, flexDirection: 'row', backgroundColor: '#007AFF', padding: 10, borderRadius: 8, justifyContent: 'center', alignItems: 'center', gap: 6 },
  mediaText: { color: 'white', fontWeight: 'bold' },

  actionButtons: { flexDirection: 'row', gap: 10, marginTop: 10 },
  cancelBtn: { flex: 1, padding: 12, backgroundColor: '#eee', borderRadius: 10, alignItems: 'center' },
  saveBtn: { flex: 1, padding: 12, backgroundColor: '#34C759', borderRadius: 10, alignItems: 'center' },

  cancelText: { fontWeight: '600' },
  saveText: { fontWeight: 'bold', color: 'white' }
});
