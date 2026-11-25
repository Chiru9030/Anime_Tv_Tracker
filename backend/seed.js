require('dotenv').config();
const mongoose = require('mongoose');
const Show = require('./models/Show');
const User = require('./models/User');

async function seedDatabase() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  console.log('Connected to DB. Deleting old shows...');
  await Show.deleteMany({});

  const shows = [
    
  // 1. Fullmetal Alchemist: Brotherhood
  {
    title: "Fullmetal Alchemist: Brotherhood",
    type: "anime",
    totalEpisodes: 64,
    genres: ["Action", "Adventure", "Fantasy"],
    year: 2009,
    description: "Two brothers seek the Philosopher's Stone to restore their bodies and save their country.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/7/7e/Fullmetal_Alchemist_Brotherhood_key_visual.png",
    tags: ["alchemy", "brothers"]
  }, 

  // 2. Death Note
  {
    title: "Death Note",
    type: "anime",
    totalEpisodes: 37,
    genres: ["Mystery", "Supernatural", "Thriller"],
    year: 2006,
    description: "A high school student gains a supernatural notebook, capable of killing anyone whose name he writes in it.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/6/6f/Death_Note_Vol_1.jpg",
    tags: ["shinigami", "psychological"]
  },

  // 3. One Punch Man
  {
    title: "One Punch Man",
    type: "anime",
    totalEpisodes: 24,
    genres: ["Action", "Comedy", "Sci-Fi"],
    year: 2015,
    description: "Saitama, a hero who can defeat any enemy with a single punch, struggles with existential boredom.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/c/c3/OnePunchMan_manga_cover.png",
    tags: ["superhero", "parody"]
  },

  // 4. My Hero Academia
  {
    title: "My Hero Academia",
    type: "anime",
    totalEpisodes: 138,
    genres: ["Action", "Super Power", "School"],
    year: 2016,
    description: "A boy born without super powers inherits the abilities of the world's greatest hero, All Might.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/5/5a/Boku_no_Hero_Academia_Volume_1.png",
    tags: ["quirks", "training"]
  },

  // 5. Demon Slayer: Kimetsu no Yaiba
  {
    title: "Demon Slayer: Kimetsu no Yaiba",
    type: "anime",
    totalEpisodes: 45,
    genres: ["Action", "Fantasy", "Historical"],
    year: 2019,
    description: "A boy seeks to turn his sister back into a human after she is turned into a demon.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/0/09/Demon_Slayer_-_Kimetsu_no_Yaiba%2C_volume_1.jpg",
    tags: ["demons", "swordsmen"]
  },

  // 6. Stranger Things (TV Series)
  {
    title: "Stranger Things",
    type: "tv",
    totalEpisodes: 34,
    genres: ["Sci-Fi", "Horror", "Drama"],
    year: 2016,
    description: "A young boy vanishes, and a secret government experiment opens a gateway to a terrifying world.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/b/b1/Stranger_Things_season_1.jpg",
    tags: ["80s", "mystery"]
  },

  // 7. Attack on Titan (Anime)
  {
    title: "Attack on Titan",
    type: "anime",
    totalEpisodes: 87,
    genres: ["Action", "Drama", "Fantasy"],
    year: 2013,
    description: "Humanity fights against giant humanoids known as Titans.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/d/d6/Shingeki_no_Kyojin_manga_volume_1.jpg",
    tags: ["titans", "apocalypse"]
  },

  // 8. Dragon Ball Z (New Addition)
  {
    title: "Dragon Ball Z",
    type: "anime",
    totalEpisodes: 291,
    genres: ["Action", "Sci-Fi", "Fantasy"],
    year: 1989,
    description: "The adventures of Goku who, with his companions, defends the Earth against villains.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/d/d0/Db_TCI.jpg",
    tags: ["aliens", "superpowers"]
  },
  
  // 9. Naruto (New Addition)
  {
    title: "Naruto",
    type: "anime",
    totalEpisodes: 220,
    genres: ["Action", "Adventure", "Fantasy"],
    year: 2002,
    description: "A young ninja seeks recognition from his peers and dreams of becoming the Hokage.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg",
    tags: ["ninja", "magic"]
  },

  // 10. Bleach (New Addition)
  {
    title: "Bleach",
    type: "anime",
    totalEpisodes: 366,
    genres: ["Action", "Supernatural"],
    year: 2004,
    description: "A high school student who can see spirits obtains the powers of a Soul Reaper.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/7/72/Bleachanime.png",
    tags: ["soul-reaper", "spirits"]
  },

  // 11. Vinland Saga (New Addition)
  {
    title: "Vinland Saga",
    type: "anime",
    totalEpisodes: 24,
    genres: ["Action", "Adventure", "Historical"],
    year: 2019,
    description: "Young Thorfinn seeks revenge for the death of his father, a Viking warrior.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/8/8c/Vinland_Saga_key_visual.png",
    tags: ["vikings", "revenge"]
  },

  // 12. Dororo (New Addition)
  {
    title: "Dororo",
    type: "anime",
    totalEpisodes: 24,
    genres: ["Action", "Adventure", "Fantasy"],
    year: 2019,
    description: "A young swordsman hunts demons to regain the parts of his body they stole.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/4/43/DororoBluraycollection.png",
    tags: ["samurai", "demons"]
  }

];

  await Show.insertMany(shows);
  console.log(`✅ Seeded ${shows.length} sample shows.`);

  await mongoose.connection.close();
  console.log('DB connection closed.');
}

seedDatabase().catch(e => {
  console.error('Seeding failed:', e);
  mongoose.connection.close();
});