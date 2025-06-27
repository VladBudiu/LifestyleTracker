"use client";

import React, { useEffect, useState } from "react";
import styles from "./Recipes.module.css";
import Navbar from "@/components/Navbar/Navbar";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const itemsPerPage = 48;

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const res = await fetch("http://localhost:9090/recipes/all");
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error("Failed to fetch all recipes:", err);
      }
    };

    fetchAllRecipes();
  }, []);

  const filtered = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalVisible(false);
    };

    if (modalVisible) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [modalVisible]);

  const openModal = (recipe: any) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRecipe(null);
  };

  const parsedIngredients = selectedRecipe?.ingredients
    ? Array.isArray(selectedRecipe.ingredients)
      ? selectedRecipe.ingredients
      : selectedRecipe.ingredients.split(",").map((i: string) => i.trim())
    : [];

  return (
    <div>
      <Navbar />
      <div className={styles.recipesPageContainer}>
        <h1 className={styles.title}>All Recipes</h1>

        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className={styles.grid}>
          {paginated.map((recipe) => (
            <div
              key={recipe.id}
              className={styles.card}
              style={{ backgroundImage: `url(${recipe.image_path})` }}
              onClick={() => openModal(recipe)}
            >
              <div className={styles.cardContent}>
                <h2>{recipe.name}</h2>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1 ||
                  page === 2 ||
                  page === totalPages - 1
              )
              .reduce((acc: (number | string)[], page, idx, arr) => {
                if (
                  idx > 0 &&
                  typeof acc[acc.length - 1] === "number" &&
                  page !== (acc[acc.length - 1] as number) + 1
                ) {
                  acc.push("...");
                }
                acc.push(page);
                return acc;
              }, [])
              .map((page, idx) =>
                page === "..." ? (
                  <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(Number(page))}
                    className={`${styles.pageBtn} ${
                      currentPage === page ? styles.active : ""
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
          </div>
        )}

        {modalVisible && selectedRecipe && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div
              className={`${styles.modalContent} ${styles.fadeIn}`}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedRecipe.image_path}
                alt={selectedRecipe.name}
                className={styles.modalImage}
              />
              <h2>{selectedRecipe.name}</h2>
              <ul>
                {parsedIngredients.map((ing: string, idx: number) => (
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
    </div>
  );
};

export default RecipesPage;
