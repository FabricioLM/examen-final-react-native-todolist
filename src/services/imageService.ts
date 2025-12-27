// src/services/imageService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiResponse } from '../interfaces';
import api from './api';

interface UploadResponse {
  url: string;
  key: string;
}

export const imageService = {
  upload: async (uri: string) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de sesión, vuelve a iniciar sesión.');
    }

    const formData = new FormData();

    const filename = uri.split('/').pop() || 'upload.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image/jpeg`;

    // @ts-ignore
    formData.append('image', {
      uri,
      name: filename,
      type,
    });

    const response = await api.post<ApiResponse<UploadResponse>>(
      '/images',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  },
};
