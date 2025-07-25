import { useState, useRef, useCallback } from "react";

export interface EditModeState<T> {
  editingId: number | null;
  editingName: string;
  editingExtra: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  startEdit: (item: T) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  setEditingName: (name: string) => void;
  setEditingExtra: (extra: string) => void;
}

interface EditableItem {
  id: number;
  name: string;
}

interface EditableItemWithExtra extends EditableItem {
  category?: string;
  severity?: string;
}

export const useEditMode = <T extends EditableItemWithExtra>(
  onSave: (id: number, name: string, extra: string) => void,
  getExtraValue: (item: T) => string = (item) =>
    item.category || item.severity || ""
): EditModeState<T> => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingExtra, setEditingExtra] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const startEdit = useCallback(
    (item: T) => {
      setEditingId(item.id);
      setEditingName(item.name);
      setEditingExtra(getExtraValue(item));
      setTimeout(() => inputRef.current?.focus(), 0);
    },
    [getExtraValue]
  );

  const saveEdit = useCallback(() => {
    if (editingId !== null) {
      onSave(editingId, editingName, editingExtra);
      setEditingId(null);
      setEditingName("");
      setEditingExtra("");
    }
  }, [editingId, editingName, editingExtra, onSave]);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditingName("");
    setEditingExtra("");
  }, []);

  return {
    editingId,
    editingName,
    editingExtra,
    inputRef,
    startEdit,
    saveEdit,
    cancelEdit,
    setEditingName,
    setEditingExtra,
  };
};
