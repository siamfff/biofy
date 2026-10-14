import { useState } from 'react';
import {
  uploadAvatar,
  uploadBackground,
  uploadAudio,
} from '../services/storageService';
import { uploadVideoBackground } from '../utils/videoUpload';
import { useAuth } from './useAuth';

type Kind = 'avatar' | 'background' | 'audio' | 'video';

export function useMediaUpload() {
  const { profile } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const upload = async (
    kind: Kind,
    uid: string,
    file: File,
  ): Promise<string | null> => {
    if (!file) {
      setError('No file selected');
      return null;
    }
    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      let url: string;
      const isPremium = profile?.premium === true;

      if (kind === 'avatar') {
        url = await uploadAvatar(uid, file);
      } else if (kind === 'background') {
        url = await uploadBackground(uid, file);
      } else if (kind === 'audio') {
        url = await uploadAudio(uid, file);
      } else {
        url = await uploadVideoBackground(
          uid,
          file,
          isPremium,
          (p) => setProgress(p),
        );
      }

      setProgress(100);
      return url;
    } catch (e: any) {
      const msg = e?.message || 'Upload failed';
      setError(msg);
      console.error('[useMediaUpload]', kind, msg);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading, progress, error, setError };
}