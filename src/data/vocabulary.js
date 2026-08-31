export const VOCABULARY_DATA = [
  {
    category: "Pronombres Personales",
    icon: "User",
    words: [
      { es: "Él", en: "He" },
      { es: "Ella", en: "She" },
      { es: "Eso/Esto", en: "It" },
      { es: "Yo", en: "I" },
      { es: "Vos/Ustedes", en: "You" },
      { es: "Nosotros/as", en: "We" },
      { es: "Ellos/as", en: "They" }
    ]
  },
  {
    category: "Verbos: Movimiento y Habilidades",
    icon: "Activity",
    words: [
      { es: "correr", en: "run" },
      { es: "caminar", en: "walk" },
      { es: "saltar", en: "jump" },
      { es: "nadar", en: "swim" },
      { es: "bailar", en: "dance" },
      { es: "cantar", en: "sing" }
    ]
  },
  {
    category: "Verbos: Actividades Escolares y Creativas",
    icon: "BookOpen",
    words: [
      { es: "leer", en: "read" },
      { es: "escribir", en: "write" },
      { es: "dibujar", en: "draw" },
      { es: "estudiar", en: "study" },
      { es: "escuchar", en: "listen" },
      { es: "hablar", en: "speak", altEn: ["talk", "speak / talk"] }
    ]
  },
  {
    category: "Verbos: Actividades Cotidianas",
    icon: "Sun",
    words: [
      { es: "jugar/tocar", en: "play" },
      { es: "mirar", en: "watch" },
      { es: "cocinar", en: "cook" },
      { es: "comer", en: "eat" },
      { es: "beber/tomar", en: "drink" },
      { es: "dormir", en: "sleep" }
    ]
  },
  {
    category: "Verbos: Acciones de la Casa",
    icon: "Home",
    words: [
      { es: "limpiar", en: "clear" },
      { es: "lavar", en: "wash" },
      { es: "abrir", en: "open" },
      { es: "cerrar", en: "close" },
      { es: "ordenar", en: "tidy up" },
      { es: "descansar / relajarse", en: "rest", altEn: ["relax", "rest / relax"] }
    ]
  },
  {
    category: "Comida: Frutas",
    icon: "Apple",
    words: [
      { es: "manzana", en: "apple" },
      { es: "banana", en: "banana" },
      { es: "naranja", en: "orange" },
      { es: "frutilla", en: "strawberry" },
      { es: "pera", en: "pear" }
    ]
  },
  {
    category: "Comida: Verduras",
    icon: "Carrot",
    words: [
      { es: "tomate", en: "tomato" },
      { es: "papa", en: "potato" },
      { es: "zanahoria", en: "carrot" },
      { es: "cebolla", en: "onion" },
      { es: "lechuga", en: "lettuce" }
    ]
  },
  {
    category: "Comida: Comidas Básicas",
    icon: "Utensils",
    words: [
      { es: "pan", en: "bread" },
      { es: "arroz", en: "rice" },
      { es: "pasta", en: "pasta" },
      { es: "carne", en: "meat" },
      { es: "pollo", en: "chicken" },
      { es: "pescado", en: "fish" }
    ]
  },
  {
    category: "Comida: Otros Alimentos",
    icon: "Pizza",
    words: [
      { es: "huevo", en: "egg" },
      { es: "queso", en: "cheese" },
      { es: "sanguche", en: "sandwich" },
      { es: "hamburguesa", en: "hamburger" },
      { es: "pizza", en: "pizza" },
      { es: "ensalada", en: "salad" }
    ]
  },
  {
    category: "Comida: Bebidas",
    icon: "Coffee",
    words: [
      { es: "agua", en: "water" },
      { es: "leche", en: "milk" },
      { es: "jugo", en: "juice" },
      { es: "té", en: "tea" },
      { es: "café", en: "coffee" }
    ]
  },
  {
    category: "Comida: Otros Básicos",
    icon: "ShoppingBag",
    words: [
      { es: "azúcar", en: "sugar", altEn: ["suggar"] },
      { es: "sal", en: "salt" },
      { es: "cereal", en: "cereal" },
      { es: "galletitas", en: "biscuits", altEn: ["cookies", "biscuits/cookies"] }
    ]
  }
];

export const getAllWords = () => {
  return VOCABULARY_DATA.flatMap(cat => 
    cat.words.map(w => ({ ...w, category: cat.category }))
  );
};
