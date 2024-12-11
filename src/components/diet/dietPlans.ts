interface DietPlan {
  dailyCalories: number;
  meals: {
    breakfast: string[];
    lunch: string[];
    snacks: string[];
    dinner: string[];
  };
  recommendations: string[];
}

const baseDietPlans = {
  vegetarian: {
    breakfast: [
      "Oatmeal with nuts and fruits",
      "Whole grain toast with avocado",
      "Vegetable poha",
      "Idli with sambar",
      "Besan chilla with mint chutney",
      "Quinoa upma with vegetables",
      "Smoothie bowl with granola"
    ],
    lunch: [
      "Brown rice with dal and vegetables",
      "Quinoa salad with roasted vegetables",
      "Whole grain roti with paneer curry",
      "Mixed vegetable pulao",
      "Chickpea curry with brown rice",
      "Vegetable biryani",
      "Lentil soup with multigrain bread"
    ],
    snacks: [
      "Mixed nuts and dried fruits",
      "Greek yogurt with berries",
      "Roasted chickpeas",
      "Fruit and nut energy bars",
      "Sprouts salad",
      "Hummus with carrot sticks",
      "Makhana (fox nuts)"
    ],
    dinner: [
      "Vegetable curry with quinoa",
      "Mixed dal khichdi",
      "Stir-fried tofu with vegetables",
      "Mushroom and pea curry",
      "Vegetable soup with whole grain bread",
      "Palak paneer with roti",
      "Baked vegetables with hummus"
    ]
  },
  nonVegetarian: {
    breakfast: [
      "Eggs with whole grain toast",
      "Chicken sandwich with vegetables",
      "Protein smoothie bowl",
      "Egg white omelette with vegetables",
      "Greek yogurt parfait",
      "Scrambled eggs with mushrooms",
      "Fish poha"
    ],
    lunch: [
      "Grilled chicken with brown rice",
      "Fish curry with quinoa",
      "Chicken stir-fry with vegetables",
      "Tuna salad with whole grain bread",
      "Lean meat curry with roti",
      "Grilled fish with roasted vegetables",
      "Chicken biryani with raita"
    ],
    snacks: [
      "Boiled eggs",
      "Chicken soup",
      "Protein shake",
      "Mixed nuts",
      "Greek yogurt with fruits",
      "Turkey sandwich",
      "Tuna salad"
    ],
    dinner: [
      "Baked fish with vegetables",
      "Chicken curry with brown rice",
      "Grilled lean meat with salad",
      "Fish stew with quinoa",
      "Chicken soup with whole grain bread",
      "Egg curry with roti",
      "Steamed fish with vegetables"
    ]
  },
  vegan: {
    breakfast: [
      "Chia seed pudding with fruits",
      "Tofu scramble with vegetables",
      "Overnight oats with plant milk",
      "Quinoa porridge with nuts",
      "Green smoothie bowl",
      "Buckwheat pancakes",
      "Avocado toast with seeds"
    ],
    lunch: [
      "Buddha bowl with tahini dressing",
      "Lentil and vegetable curry",
      "Quinoa and black bean bowl",
      "Chickpea salad with avocado",
      "Tempeh stir-fry with brown rice",
      "Vegan burrito bowl",
      "Mixed bean soup"
    ],
    snacks: [
      "Trail mix",
      "Roasted chickpeas",
      "Fresh fruits",
      "Energy balls",
      "Vegetable sticks with hummus",
      "Almond milk smoothie",
      "Seeded crackers"
    ],
    dinner: [
      "Grilled tofu steaks",
      "Mushroom and pea curry",
      "Lentil shepherd's pie",
      "Vegetable and bean stew",
      "Cauliflower rice bowl",
      "Sweet potato curry",
      "Zucchini noodles with sauce"
    ]
  }
};

const healthConditionModifications = {
  Diabetes: {
    recommendations: [
      "Monitor carbohydrate intake carefully",
      "Choose low glycemic index foods",
      "Eat at regular intervals",
      "Include fiber-rich foods",
      "Limit sugary foods and beverages"
    ],
    avoid: ["White rice", "White bread", "Sugary drinks", "Processed snacks"]
  },
  Hypertension: {
    recommendations: [
      "Reduce sodium intake",
      "Include potassium-rich foods",
      "Limit processed foods",
      "Choose lean proteins",
      "Include heart-healthy fats"
    ],
    avoid: ["Salty snacks", "Processed meats", "Pickled foods", "High-sodium condiments"]
  },
  "Heart Disease": {
    recommendations: [
      "Choose heart-healthy fats",
      "Limit saturated fats",
      "Include omega-3 rich foods",
      "Reduce sodium intake",
      "Increase fiber intake"
    ],
    avoid: ["Fried foods", "Full-fat dairy", "Red meat", "Trans fats"]
  },
  Obesity: {
    recommendations: [
      "Control portion sizes",
      "Choose nutrient-dense foods",
      "Increase protein intake",
      "Include plenty of vegetables",
      "Stay hydrated"
    ],
    avoid: ["Sugary drinks", "Processed snacks", "Refined carbohydrates", "High-calorie desserts"]
  }
};

export const getDietPlan = (userDetails: any): DietPlan => {
  const basePlan = baseDietPlans[userDetails.foodPreference as keyof typeof baseDietPlans];
  const healthMods = healthConditionModifications[userDetails.healthCondition as keyof typeof healthConditionModifications];

  // Calculate daily calories based on Harris-Benedict equation
  let bmr;
  if (userDetails.gender === 'male') {
    bmr = 88.362 + (13.397 * Number(userDetails.weight)) + (4.799 * Number(userDetails.height)) - (5.677 * Number(userDetails.age));
  } else {
    bmr = 447.593 + (9.247 * Number(userDetails.weight)) + (3.098 * Number(userDetails.height)) - (4.330 * Number(userDetails.age));
  }

  // Activity level multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725,
    extra: 1.9
  };

  const dailyCalories = Math.round(bmr * activityMultipliers[userDetails.activityLevel as keyof typeof activityMultipliers]);

  // Generate recommendations based on health condition and BMI
  let recommendations = [
    "Stay hydrated by drinking at least 8 glasses of water daily",
    "Eat slowly and mindfully",
    "Include a variety of colorful fruits and vegetables",
    "Get adequate sleep for better metabolism"
  ];

  if (healthMods) {
    recommendations = [...recommendations, ...healthMods.recommendations];
  }

  if (userDetails.bmi > 25) {
    recommendations.push("Focus on portion control");
    recommendations.push("Include more fiber-rich foods");
  } else if (userDetails.bmi < 18.5) {
    recommendations.push("Include healthy calorie-dense foods");
    recommendations.push("Eat more frequent meals");
  }

  return {
    dailyCalories,
    meals: basePlan,
    recommendations
  };
};