import React, { useState } from "react";

function Menu() {
  const menuData = [
    {
      category: "Entrées",
      items: [
        {
          title: "Salade César",
          description:
            "Laitue romaine, croûtons, poulet grillé, vinaigrette César",
          price: 9.99,
        },
        {
          title: "Soupe à l'oignon",
          description:
            "Soupe à base de bouillon de boeuf, oignons, croûtons et fromage gratiné",
          price: 7.99,
        },
        {
          title: "Calamars frits",
          description: "Calamars panés et frits, servi avec une sauce tartare",
          price: 12.99,
        },
      ],
    },
    {
      category: "Plats principaux",
      items: [
        {
          title: "Burger classique",
          description:
            "Pain, steak haché, fromage, salade, tomate, oignon, frites",
          price: 14.99,
        },
        {
          title: "Poulet rôti",
          description: "Poulet rôti, légumes de saison, pommes de terre rôties",
          price: 17.99,
        },
        {
          title: "Steak grillé",
          description:
            "Steak grillé, sauce au poivre, frites, légumes de saison",
          price: 21.99,
        },
        {
          title: "Pâtes à la carbonara",
          description:
            "Pâtes fraîches, lardons, crème fraîche, oeufs, parmesan",
          price: 16.99,
        },
        {
          title: "Pizza Margherita",
          description: "Tomate, mozzarella, basilic",
          price: 14.35,
        },
        {
          title: "Ratatouille",
          description: "Légumes d'été mijotés, servi avec du riz",
          price: 12.65,
        },
        {
          title: "Pad thaï",
          description:
            "Nouilles sautées, crevettes, poulet, légumes, cacahuètes",
          price: 15.36,
        },
      ],
    },
    {
      category: "Desserts",
      items: [
        {
          title: "Tarte aux pommes",
          description:
            "Tarte aux pommes maison, servie avec de la crème anglaise",
          price: 7.99,
        },
        {
          title: "Crème brûlée",
          description: "Crème brûlée à la vanille, servi avec un biscuit",
          price: 6.99,
        },
        {
          title: "Assiette de fromages",
          description:
            "Assiette de fromages variés, servie avec des noix et de la confiture",
          price: 9.99,
        },
      ],
    },
  ];

  const menuDataWithMenus = [
    {
      category: "Menus",
      items: [
        {
          title: "Menu du jour",
          description: "Plat du jour + dessert du jour",
          options: [
            { title: "Poulet rôti", price: 18.99 },
            { title: "Steak grillé", price: 22.99 },
            { title: "Pâtes à la carbonara", price: 16.99 },
          ],
          dessert: [
            {
              title: "Tarte aux pommes",
              price: 7.99,
            },
            {
              title: "Tarte aux framboises",
              price: 7.99,
            },
            {
              title: "Pannacota du chef Michant",
              price: 7.99,
            },
          ],
          price: 24.99,
        },
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState("Entrées");
  const [showMenus, setShowMenus] = useState(false);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setShowMenus(false);
  };

  const handleMenusClick = () => {
    setShowMenus(true);
    setActiveCategory(null);
  };

  return (
    <div>
      <h1>Menu</h1>
      <div>
        {menuData.map((categoryData) => (
          <button
            key={categoryData.category}
            onClick={() => handleCategoryClick(categoryData.category)}
            className={activeCategory === categoryData.category ? "active" : ""}
          >
            {categoryData.category}
          </button>
        ))}
        <button
          onClick={handleMenusClick}
          className={showMenus ? "active" : ""}
        >
          Menus
        </button>
      </div>
      {showMenus ? (
        <div>
          {menuDataWithMenus.map((category) => (
            <div key={category.category}>
              <h2>{category.category}</h2>
              {category.items.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.price} €</p>
                  <p>{item.description}</p>
                  <h2>Plat</h2>
                  <ul>
                    {item.options.map((option) => (
                      <li key={option.title}>
                        {option.title} - {option.price} €
                      </li>
                    ))}
                  </ul>
                  <h2>Dessert</h2>
                  <ul>
                    {item.dessert.map((dessert) => (
                      <li key={dessert.title}>
                        {dessert.title} - {dessert.price} €
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {menuData
            .find((categoryData) => categoryData.category === activeCategory)
            .items.map((item) => (
              <div key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>{item.price} €</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
