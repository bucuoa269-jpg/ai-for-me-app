import { useCallback, useEffect, useState } from 'react';
import type { UserActionStatus } from '../types';

// 本地收藏与状态：仅存于浏览器 localStorage。
// 提示用户：清理浏览器数据后会消失。后续可接 Supabase / Firebase / 登录系统。

const FAV_KEY = 'aiforme.favorites.v1';
const STATUS_KEY = 'aiforme.status.v1';
const SEARCH_KEY = 'aiforme.searchHistory.v1';

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // 通知同页其它 hook 实例
    window.dispatchEvent(new CustomEvent('aiforme-storage', { detail: { key } }));
  } catch {
    /* localStorage 不可用时静默降级 */
  }
}

// ---------------- 收藏 ----------------
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => readJSON(FAV_KEY, []));

  useEffect(() => {
    const sync = () => setFavorites(readJSON(FAV_KEY, []));
    window.addEventListener('aiforme-storage', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('aiforme-storage', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeJSON(FAV_KEY, next);
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}

// ---------------- 行动状态 ----------------
export function useActionStatus() {
  const [statusMap, setStatusMap] = useState<Record<string, UserActionStatus>>(() =>
    readJSON(STATUS_KEY, {}),
  );

  useEffect(() => {
    const sync = () => setStatusMap(readJSON(STATUS_KEY, {}));
    window.addEventListener('aiforme-storage', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('aiforme-storage', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const setStatus = useCallback((id: string, status: UserActionStatus | null) => {
    setStatusMap((prev) => {
      const next = { ...prev };
      if (status === null) delete next[id];
      else next[id] = status;
      writeJSON(STATUS_KEY, next);
      return next;
    });
  }, []);

  return { statusMap, setStatus };
}

// ---------------- 搜索历史 ----------------
export function getSearchHistory(): string[] {
  return readJSON(SEARCH_KEY, []);
}

export function pushSearchHistory(query: string) {
  const q = query.trim();
  if (!q) return;
  const prev = getSearchHistory().filter((x) => x !== q);
  writeJSON(SEARCH_KEY, [q, ...prev].slice(0, 8));
}

export function clearSearchHistory() {
  writeJSON(SEARCH_KEY, []);
}
