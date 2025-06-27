'use client';

import React, { useState } from 'react';
import styles from './CreateWorkoutForm.module.css';
import { set } from 'react-hook-form';

const CreateWorkoutForm = ({
  onAdd,
  defaultType,
}: {
  onAdd: (w: any) => void;
  defaultType: string;
}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState(defaultType); // 👈 prefill it
  const [duration, setDuration] = useState('');
  const [img, setImg] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      title,
      type,
      description: desc,
      duration: parseInt(duration),
      imageUrl: img,
    });
    setTitle('');
    setDesc('');
    setDuration('');
    setImg('');
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <h3>Create Custom Workout</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Workout Title"
        required
      />
      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        value={type}
        disabled
        readOnly
        placeholder="Type"
        className={styles.disabledInput}
      />
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration (min)"
        required
      />
      <input
        value={img}
        onChange={(e) => setImg(e.target.value)}
        placeholder="Image URL"
      />
      <button type="submit">Add Workout</button>
    </form>
  );
};

export default CreateWorkoutForm;

