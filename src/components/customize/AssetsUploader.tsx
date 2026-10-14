import { useAuth } from '../../hooks/useAuth';
import { updateUserProfile } from '../../services/userService';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FileUploader } from '../common/FileUploader';
import { useMediaUpload } from '../../hooks/useMediaUpload';
import { useToast } from '../../hooks/useToast';
import { AppearanceSettings } from '../../types';
import {
  ALLOWED_AVATAR_TYPES,
  MAX_AVATAR_SIZE,
  ALLOWED_BG_TYPES,
  MAX_BG_SIZE,
} from '../../utils/constants';
import { FiMusic, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface Props {
  appearance: AppearanceSettings;
  setAppearance: (a: AppearanceSettings) => void;
}

export function AssetsUploader({ appearance, setAppearance }: Props) {
  const { profile, refreshProfile } = useAuth();
  const { upload } = useMediaUpload();
  const toast = useToast();

  if (!profile) return null;

  const saveAppearance = async (next: AppearanceSettings) => {
    setAppearance(next);
    await updateUserProfile(profile.uid, { appearance: next });
    await refreshProfile();
  };

  const onAvatar = async (file: File) => {
    try {
      const url = await upload('avatar', profile.uid, file);
      if (!url) {
        toast.error('Avatar upload failed');
        return;
      }
      await updateUserProfile(profile.uid, { avatarUrl: url });
      await refreshProfile();
      toast.success('Avatar updated');
    } catch (e: any) {
      toast.error(e?.message || 'Failed to update avatar');
    }
  };

  const onBgImage = async (file: File) => {
    try {
      const url = await upload('background', profile.uid, file);
      if (!url) {
        toast.error('Background upload failed');
        return;
      }
      const next = {
        ...appearance,
        backgroundType: 'image' as const,
        backgroundVideo: null,
      };
      await updateUserProfile(profile.uid, { backgroundUrl: url, appearance: next });
      setAppearance(next);
      await refreshProfile();
      toast.success('Background uploaded');
    } catch (e: any) {
      toast.error(e?.message || 'Failed to upload background');
    }
  };

  const onBgVideo = async (file: File) => {
    try {
      const url = await upload('video', profile.uid, file);
      if (!url) {
        toast.error('Video upload failed — check file size or duration');
        return;
      }
      const next = {
        ...appearance,
        backgroundType: 'video' as const,
        backgroundVideo: url,
      };
      await updateUserProfile(profile.uid, { appearance: next });
      setAppearance(next);
      await refreshProfile();
      toast.success('Video background uploaded');
    } catch (e: any) {
      toast.error(e?.message || 'Failed to upload video');
    }
  };

  const onCursor = async (file: File) => {
    try {
      const url = await upload('avatar', profile.uid, file);
      if (!url) {
        toast.error('Cursor upload failed');
        return;
      }
      await updateUserProfile(profile.uid, { customCursor: url });
      await refreshProfile();
      toast.success('Custom cursor uploaded');
    } catch (e: any) {
      toast.error(e?.message || 'Failed to upload cursor');
    }
  };

  const removeBg = async () => {
    const next = {
      ...appearance,
      backgroundType: 'color' as const,
      backgroundVideo: null,
    };
    await updateUserProfile(profile.uid, {
      backgroundUrl: null,
      customBackground: null,
      appearance: next,
    });
    setAppearance(next);
    await refreshProfile();
    toast.success('Background removed');
  };

  const removeAvatar = async () => {
    await updateUserProfile(profile.uid, { avatarUrl: null });
    await refreshProfile();
    toast.success('Avatar removed');
  };

  const removeCursor = async () => {
    await updateUserProfile(profile.uid, { customCursor: null });
    await refreshProfile();
    toast.success('Custom cursor removed');
  };

  const isVideoMode = appearance.backgroundType === 'video';
  const isImageMode = appearance.backgroundType === 'image';

  return (
    <section id="assets" className="scroll-mt-24">
      <Card title="Assets Uploader" description="Upload your profile assets">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Background */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-muted">Background</label>
              {profile.backgroundUrl && (
                <button
                  onClick={removeBg}
                  className="text-[10px] text-danger hover:underline flex items-center gap-1"
                >
                  <FiTrash2 size={10} /> Remove
                </button>
              )}
            </div>

            {/* Mode toggle */}
            <div className="flex gap-1 mb-2">
              <button
                type="button"
                onClick={() => {
                  const next = { ...appearance, backgroundType: 'image' as const };
                  saveAppearance(next);
                }}
                className={`flex-1 text-[10px] px-2 py-1 rounded-md transition ${
                  isImageMode
                    ? 'bg-brand text-white'
                    : 'bg-bg-soft text-muted hover:text-white'
                }`}
              >
                Image
              </button>
              <button
                type="button"
                onClick={() => {
                  const next = { ...appearance, backgroundType: 'video' as const };
                  saveAppearance(next);
                }}
                className={`flex-1 text-[10px] px-2 py-1 rounded-md transition ${
                  isVideoMode
                    ? 'bg-brand text-white'
                    : 'bg-bg-soft text-muted hover:text-white'
                }`}
              >
                Video
              </button>
            </div>

            {isVideoMode ? (
              <FileUploader
                accept="video/mp4,video/webm,video/quicktime"
                maxSize={20 * 1024 * 1024}
                maxDurationSeconds={15}
                premiumMaxDurationSeconds={60}
                kind="video"
                onFile={onBgVideo}
                preview={appearance.backgroundVideo}
                hint={
                  profile.premium
                    ? 'MP4 / WebM · ⭐ Premium: up to 60s'
                    : 'MP4 / WebM · max 15s (Premium: 60s)'
                }
                aspect="wide"
              />
            ) : (
              <FileUploader
                accept={ALLOWED_BG_TYPES.join(',')}
                maxSize={MAX_BG_SIZE}
                onFile={onBgImage}
                preview={profile.backgroundUrl}
                hint="JPG, PNG, WEBP · max 15 MB"
                aspect="wide"
              />
            )}

            {!profile.premium && isVideoMode && (
              <Link
                to="/dashboard/premium"
                className="mt-2 inline-flex items-center gap-1 text-[10px] text-brand-soft hover:underline"
              >
                ⭐ Upgrade to Premium for longer videos (up to 60s)
              </Link>
            )}
          </div>

          {/* Audio */}
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5">Audio</label>
            <Link
              to="/dashboard/customize#music"
              className="block aspect-video rounded-2xl border-2 border-dashed border-border bg-bg-soft hover:bg-bg-elevated hover:border-brand/60 transition flex flex-col items-center justify-center text-center p-4 gap-2"
            >
              <FiMusic size={32} className="text-muted" />
              <p className="text-xs text-muted">
                {profile.music?.enabled ? 'Audio configured' : 'Click to open audio manager'}
              </p>
            </Link>
          </div>

          {/* Profile Avatar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-muted">Profile Avatar</label>
              {profile.avatarUrl && (
                <button
                  onClick={removeAvatar}
                  className="text-[10px] text-danger hover:underline flex items-center gap-1"
                >
                  <FiTrash2 size={10} /> Remove
                </button>
              )}
            </div>
            <FileUploader
              accept={ALLOWED_AVATAR_TYPES.join(',')}
              maxSize={MAX_AVATAR_SIZE}
              onFile={onAvatar}
              preview={profile.avatarUrl}
              aspect="wide"
              hint="JPG, PNG, WEBP · max 5 MB"
            />
          </div>

          {/* Custom Cursor */}
          <div className="sm:col-span-2 lg:col-span-3">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-muted">Custom Cursor</label>
              {profile.customCursor && (
                <button
                  onClick={removeCursor}
                  className="text-[10px] text-danger hover:underline flex items-center gap-1"
                >
                  <FiTrash2 size={10} /> Remove
                </button>
              )}
            </div>
            <FileUploader
              accept="image/png,image/svg+xml,image/webp"
              maxSize={1 * 1024 * 1024}
              onFile={onCursor}
              preview={profile.customCursor}
              aspect="wide"
              hint="PNG / SVG · max 32×32 recommended"
            />
          </div>
        </div>
      </Card>
    </section>
  );
}