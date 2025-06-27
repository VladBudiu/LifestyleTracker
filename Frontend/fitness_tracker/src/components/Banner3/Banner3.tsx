import React, { useEffect, useState } from 'react';
import styles from './Banner3.module.css';

const Banner3 = () => {
  const [meals, setMeals] = useState<{
    id: number;
    name: string;
    ingredients: string[] | string;
    calories: number;
    image_path: string;
  }[]>([]);

  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedMeal, setSelectedMeal] = useState<typeof meals[0] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(`http://localhost:9090/recipes/random`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    fetchMeals();
  }, []);

  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalVisible(false);
    };

    if (modalVisible) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [modalVisible]);

  const handleShowMore = () => setVisibleCount((prev) => prev + 12);
  const allVisible = visibleCount >= meals.length;

  const openModal = (meal: typeof meals[0]) => {
    setSelectedMeal(meal);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMeal(null);
  };

  const parsedIngredients = selectedMeal?.ingredients
    ? Array.isArray(selectedMeal.ingredients)
      ? selectedMeal.ingredients
      : selectedMeal.ingredients.split(',').map((i) => i.trim())
    : [];

  return (
    <div className={styles.nutritionBannerContainer}>
      <h1 className={styles.nutritionHeading}>Nutrition Ideas</h1>

      <div className={styles.recipeGrid}>
        {meals.slice(0, visibleCount).map((meal) => (
          <div
            key={meal.id}
            className={styles.recipeCard}
            style={{ backgroundImage: `url(${meal.image_path})` }}
            onClick={() => openModal(meal)}
          >
            <div className={styles.recipeContent}>
              <h2>{meal.name}</h2>
            </div>
          </div>
        ))}
      </div>

      {meals.length > 0 &&
        (allVisible ? (
          <button className={styles.showMoreButton} onClick={() => window.location.href = '/recipes'}>
            Take Me to the Recipes Page
          </button>
        ) : (
          <button className={styles.showMoreButton} onClick={handleShowMore}>
            Show More Recipes
          </button>
        ))}

      {modalVisible && selectedMeal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={`${styles.modalContent} ${styles.fadeIn}`}
            onClick={(e) => e.stopPropagation()} 
          >
            <img src={selectedMeal.image_path} alt={selectedMeal.name} className={styles.modalImage} />
            <h2>{selectedMeal.name}</h2>
            <ul>
              {parsedIngredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner3;
