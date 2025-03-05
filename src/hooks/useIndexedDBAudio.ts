/* eslint-disable @arthurgeron/react-usememo/require-usememo */

// This hook been copied
import { useState } from "react";
import { useGetCurrentUser } from "./useGetCurrentUser";

const DB_NAME = "AudioDB";
const STORE_NAME = "audioFiles";
const DB_VERSION = 1;

const openDB = (currentUser: string): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(`${currentUser}_${DB_NAME}`, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const useIndexedDBAudio = () => {
  const currentUser = useGetCurrentUser();
  const [audioFiles, setAudioFiles] = useState<{ name: string; file: Blob }[]>(
    []
  );

  // Save an audio file
  const saveAudioFile = async (name: string, file: Blob) => {
    const db = await openDB(currentUser);
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.put(file, name);
  };

  // Retrieve all audio files
  const getAudioFiles = async () => {
    const db = await openDB(currentUser);
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAllKeys();

    request.onsuccess = async () => {
      const keys = request.result as string[];
      const files: { name: string; file: Blob }[] = [];

      for (const key of keys) {
        const fileRequest = store.get(key);
        await new Promise<void>((resolve) => {
          fileRequest.onsuccess = () => {
            if (fileRequest.result) {
              files.push({ name: key, file: fileRequest.result as Blob });
            }
            resolve();
          };
        });
      }

      setAudioFiles(files);
    };
  };

  // Delete an audio file by name
  const deleteAudioFile = async (name: string) => {
    const db = await openDB(currentUser);
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.delete(name);
    setAudioFiles((prev) => prev.filter((file) => file.name !== name));
  };

  // Clear all audio files
  const clearAllAudioFiles = async () => {
    const db = await openDB(currentUser);
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.clear();
    setAudioFiles([]);
  };

  // // Load audio files on mount
  // useEffect(() => {
  //   getAudioFiles();
  // }, [getAudioFiles]);

  return {
    audioFiles,
    saveAudioFile,
    getAudioFiles,
    deleteAudioFile,
    clearAllAudioFiles,
  };
};
