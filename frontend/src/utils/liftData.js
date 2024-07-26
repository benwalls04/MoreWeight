
const movements = {
  "barbell bench press": {
    "primary": "chest", 
    "secondary": ["triceps, shoulders"], 
    "liftTypes": [1, 2, 3], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": ["flat barbell bench press", "incline barbell bench press", "decline barbell bench press"], 
  }, 
  "dumbell bench press": {
    "primary": "chest", 
    "secondary": ["triceps, shoulders"], 
    "liftTypes": [2, 3], 
    "sequences": {
      "b": [7, 8, 8, 9],
      "i": [8, 8, 9, 9],
      "a": [8, 9, 9, 9]
    }, 
    "variants": ["flat dumbell bench press", "incline dumbell bench press", "decline dumbell bench press"], 
  }, 
  "smith machine press": {
    "primary": "chest", 
    "secondary": ["triceps, shoulders"], 
    "liftTypes": [3, 2, 1], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": [ "flat smith machine press", "incline smith machine press", "decline smith machine press"], 
  }, 
  "machine chest press": {
    "primary": "chest", 
    "secondary": ["triceps, shoulders"], 
    "liftTypes": [3], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": ["machine chest press", "decline machine chest press", "incline machine chest press"], 
  }, 
  "weighted dips": {
    "primary": "chest", 
    "secondary": ["triceps, shoulders"], 
    "liftTypes": [3, 2], 
    "sequences": {
      "b": [7, 8, 8, 9],
      "i": [8, 8, 9, 9],
      "a": [8, 9, 9, 9]
    }, 
    "variants": ["weighted dips"], 
  }, 
  "cable fly": {
    "primary": "chest", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": [ "cable fly", "high-to-low cable fly" , "low-to-high cable fly"], 
  }, 
  "pec-dec fly": {
    "primary": "chest", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["pec-dec fly"], 
  }, 
  "cable chest press": {
    "primary": "chest", 
    "secondary": [], 
    "liftTypes": [4],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["cable chest press", "high-to-low cable chest press", "low-to-high cable chest press"],
  }, 
  "lat pulldown": {
    "primary": "back", 
    "secondary": ["biceps"], 
    "liftTypes": [3, 2], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["lat pulldown", "wide grip lat pull down", "narrow grip lat pulldown"], 
  }, 
  "single hand lat pulldown": {
    "primary": "back", 
    "secondary": ["biceps"], 
    "liftTypes": [3, 2], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["single hand lat pulldown"],
  }, 
  "underhand lat pulldown": {
    "primary": "back", 
    "secondary": ["biceps"], 
    "liftTypes": [3, 2], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["underhand lat pull down"],
  }, 
  "pull ups": {
    "primary": "back", 
    "secondary": ["biceps"], 
    "liftTypes": [2, 3, 1], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": ["pull ups", "underhand pull ups", "wide grip pull ups"],
  }, 
  "seated row": {
    "primary": "back", 
    "secondary": ["biceps"], 
    "liftTypes": [3, 2], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["seated row", "narrow grip seated row", "wide grip seated row"],
  }, 
  "machine row": {
    "primary": "back", 
    "secondary": ["biceps"], 
    "liftTypes": [3, 2], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["machine row", "narrow grip machine row", "wide grip machine row", ],
  }, 
  "t-bar row": {
    "primary": "back", 
    "secondary": ["biceps"], 
    "liftTypes": [1, 2, 3], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": [ "t-bar row", "wide grip t-bar row", "narrow grip t-bar row"],
  }, 
  "barbell row": {
    "primary": "back", 
    "secondary": ["biceps"], 
    "liftTypes": [1, 2, 3], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": ["barbell row", "underhand barbell row", "wide grip barbell row"],
  }, 
  "single-arm cable row": {
    "primary": "back", 
    "secondary": ["biceps"], 
    "liftTypes": [3, 2], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["single-arm cable row"],
  }, 
  "lat pullover": {
    "primary": "back", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["lat pullover"],
  }, 
  "single arm lat pullover": {
    "primary": "back",
    "secondary": [],
    "liftTypes": [4],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    variants: ["single arm lat pullover"],
  }, 
  "reverse pec-dec fly": {
    "primary": "back", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["reverse pec-dec fly"],
  }, 
  "face pulls": {
    "primary": "back",
    "secondary": [],
    "liftTypes": [4],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    "variants": ["face pulls"],
  }, 
  "barbell squat": {
    "primary": "legs", 
    "secondary": [], 
    "liftTypes": [1, 2, 3], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": ["barbell squat", "low-bar barbell squat"],
  }, 
  "hack squat": {
    "primary": "legs", 
    "secondary": [], 
    "liftTypes": [2, 3, 1], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": ["hack squat", "high-foot hack squat"],
  }, 
  "smith machine squat": {
    "primary": "legs", 
    "secondary": [], 
    "liftTypes": [2, 3, 1], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": ["smith machine squat", "low-bar smith machine squat"],
  }, 
  "bulgarian split squat": {
    "primary": "legs", 
    "secondary": [], 
    "liftTypes": [3, 2], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": [ "bulgarian split squat", "extended bulgarian split squat", "close bulgarian split squat"],
  }, 
  "front squat": {
    "primary": "legs",
    "secondary": [],
    "liftTypes": [3, 2],
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    },
    "variants": ["front squat"],
  }, 
  "romanian deadlift": {
    "primary": "legs", 
    "secondary": [], 
    "liftTypes": [2, 1, 3], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": ["romanian deadlift"],
  }, 
  "deadlift": {
    "primary": "legs", 
    "secondary": ["back"], 
    "liftTypes": [1, 2], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": ["deadlift"],
  }, 
  "leg press": {
    "primary": "legs", 
    "secondary": [], 
    "liftTypes": [2, 3], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": ["leg press", "high-foot leg press", "low-foot leg press"],
  }, 
  "machine leg press": {
    "primary": "legs", 
    "secondary": [], 
    "liftTypes": [3, 2], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["machine leg press", "high-foot machine leg press", "low-foot machine leg press"],
  }, 
  "leg extension": {
    "primary": "legs", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["leg extension"],
  }, 
  "single leg extension": {
    "primary": "legs", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["single leg extension"],
  }, 
  "seated leg curl": {
    "primary": "legs", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["seated leg curl"],
  }, 
  "lying leg curl": {
    "primary": "legs", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["lying leg curl"],
  }, 
  "military press": {
    "primary": "shoulders", 
    "secondary": [], 
    "liftTypes": [2, 1, 3], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": ["military press"],
  }, 
  "dumbell overhead press": {
    "primary": "shoulders", 
    "secondary": [], 
    "liftTypes": [2, 3], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": ["dumbell overhead press", "narrow dumbell overhead press", "wide dumbell overhead press"],
  }, 
  "smith machine overhead press": {
    "primary": "shoulders", 
    "secondary": [], 
    "liftTypes": [3, 2], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": ["smith machine overhead press", "wide smith machine overhead press", "narrow smith machine overhead press"],
  }, 
  "cable front raise": {
    "primary": "shoulders", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["cable front raise"]
  }, 
  "dumbell front raise": {
    "primary": "shoulders", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": ["dumbell front raise"]
  }, 
  "cable lateral raise": {
    "primary": "shoulders", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["cable lateral raise"]
  }, 
  "dumbell lateral raise": {
    "primary": "shoulders", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["dumbell lateral raise"]
  }, 
  "machine lateral raise": {
    "primary": "shoulders", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["machine lateral raise"]
  }, 
  "dumbell curl": {
    "primary": "biceps", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["dumbell curl", "dumbell hammer curl"]
  }, 
  "cable curl": {
    "primary": "biceps", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["cable curl", "rope curl", "cable drag curl"]
  }, 
  "preacher curl": {
    "primary": "biceps", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["preacher curl"]
  }, 
  "incline curl": {
    "primary": "biceps", 
    "secondary": [""], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["incline curl"]
  }, 
  "concentration curl": {
    "primary": "biceps", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["concentration curl"]
  }, 
  "barbell curl": {
    "primary": "biceps", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["barbell curl"]
  }, 
  "machine curl": {
    "primary": "biceps",
    "secondary": [],
    "liftTypes": [4],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    },
    "variants": ["machine curl"]
  }, 
  "machine preacher curl": {
    "primary": "biceps",
    "secondary": [],
    "liftTypes": [4],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    },
    "variants": ["machine preacher curl"]
  }, 
  "skullcrusher": {
    "primary": "triceps", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": ["skullcrusher", "incline skullcrusher"]
  }, 
  "tricep pushdown": {
    "primary": "triceps", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": ["tricep pushdown",  "rope tricep pushdown"]
  }, 
  "overhead tricep extension": {
    "primary": "triceps", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": ["overhead tricep extension", "rope overhead tricep extension"]
  },
  "cross body tricep extension": {
    "primary": "triceps", 
    "secondary": [], 
    "liftTypes": [4], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": ["cross body tricep extension"]
  },
  "machine tricep extension": {
    "primary": "triceps",
    "secondary": [],
    "liftTypes": [4],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    },
    "variants": ["machine tricep extension"]
  }
}

const begginerMovements = ["barbell bench press", "dumbell bench press", "machine chest press", "pec-dec fly", "lat pulldown", "seated row", "machine row", "reverse pec-dec fly", "barbell squat", "hack squat", "leg press", "machine leg press", "leg extension", "seated leg curl", "lying leg curl", "dumbell overhead press", "dumbell front raise", "dumbell lateral raise", "dumbell curl", "cable curl", "preacher curl", "tricep pushdown", "machine tricep extension"]

const accesories = {
  "dumbell lateral raise": {
    "primary": "side deltoids",
    "secondary": [],
    "liftTypes": [5],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    "variants": ["dumbell lateral raise"]
  }, 
  "cable lateral raise": {
    "primary": "side deltoids",
    "secondary": [],
    "liftTypes": [5],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    "variants": ["cable lateral raise"]
  }, 
  "machine lateral raise": {
    "primary": "side deltoids",
    "secondary": [],
    "liftTypes": [5],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    "variants": ["machine lateral raise"]
  }, 
  "shrugs": {
    "primary": "traps",
    "secondary": [],
    "liftTypes": [5],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    "variants": ["machine shrugs", "smith machine shrugs", "barbell shrugs", "dumbell shrugs"]
  }, 
  "rear delt fly": {
    "primary": "rear deltoids",
    "secondary": [],
    "liftTypes": [5],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    "variants": ["cable rear delt fly", "dumbell rear delt fly"]
  }, 
  "forearm curl": {
    "primary": "forearms",
    "secondary": [],
    "liftTypes": [5],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    "variants": ["straight bar forearm curl", "cable forearm curl", "dumbell forearm curl"]
  }, 
  "calf raise": {
    "primary": "calves",
    "secondary": [],
    "liftTypes": [5],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    "variants": ["machine calf raise", "smith machine calf raise", "dumbell calf raise", "barbell calf raise"]
  }, 
  "abs": {
    "primary": "abs",
    "secondary": [],
    "liftTypes": [5],
    "sequences": {
      "b": [8, 8, 8, 8],
      "i": [8, 8, 8, 8],
      "a": [8, 8, 8, 8]
    },
    "variants": ["cable crunch", "dumbell side bend", "weighted leg raise", "weighted situps"]
  }, 
}

const variants = {
  "incline barbell bench press": {
    "group": "chest",
    "movement": "barbell bench press",
    "region": "upper chest", 
    "variants": [], 
    "notes": ""
  }, 
  "flat barbell bench press": {
    "group": "chest",
    "movement": "barbell bench press",
    "region": "neutral", 
    "variants": [],
    "notes": ""
  }, 
  "decline barbell bench press": {
    "group": "chest",
    "movement": "barbell bench press",
    "region": "lower chest", 
    "variants": [],
    "notes": ""
  },
  "incline dumbell bench press": {
    "group": "chest", 
    "movement": "dumbell bench press",
    "region": "upper chest", 
    "variants": [], 
    "notes": ""
  },
  "flat dumbell bench press": {
    "group": "chest", 
    "movement": "dumbell bench press",
    "region": "neutral", 
    "variants": [],
    "notes": ""
  },
  "decline dumbell bench press": {
    "group": "chest", 
    "movement": "dumbell bench press",
    "region": "lower chest", 
    "variants": [],
    "notes": ""
  },
  "incline smith machine press": {
    "group": "chest", 
    "movement": "smith machine press",
    "region": "upper chest", 
    "variants": [], 
    "notes": ""
  },
  "flat smith machine press": {
    "group": "chest", 
    "movement": "smith machine press",
    "region": "neutral", 
    "variants": [],
    "notes": ""
  },
  "decline smith machine press": {
    "group": "chest", 
    "movement": "smith machine press",
    "region": "lower chest", 
    "variants": [],
    "notes": ""
  },
  "incline machine chest press": {
    "group": "chest", 
    "movement": "machine chest press",
    "region": "upper chest", 
    "variants": [], 
    "notes": ""
  },
  "machine chest press": {
    "group": "chest", 
    "movement": "machine chest press",
    "region": "neutral", 
    "variants": [],
    "notes": ""
  },
  "decline machine chest press": {
    "group": "chest", 
    "movement": "machine chest press",
    "region": "lower chest", 
    "variants": [],
    "notes": ""
  },
  "weighted dips": {
    "group": "chest", 
    "movement": "weighted dips",
    "region": "lower chest", 
    "variants": [], 
    "notes": ""
  },
  "low-to-high cable fly": {
    "group": "chest", 
    "movement": "cable fly",
    "region": "upper chest", 
    "variants": [], 
    "notes": ""
  },
  "cable fly": {
    "group": "chest", 
    "movement": "cable fly",
    "region": "neutral", 
    "variants": [],
    "notes": ""
  },
  "high-to-low cable fly": {
    "group": "chest", 
    "movement": "cable fly",
    "region": "lower chest", 
    "variants": [],
    "notes": ""
  },
  "pec-dec fly": {
    "group": "chest", 
    "movement": "pec-dec fly",
    "region": "neutral", 
    "variants": [],
    "notes": ""
  },
  "cable chest press": {
    "group": "chest", 
    "movement": "cable chest press",
    "region": "neutral", 
    "variants": [],
    "notes": ""
  },
  "high-to-low cable chest press": {
    "group": "chest", 
    "movement": "cable chest press",
    "region": "lower chest", 
    "variants": [],
    "notes": ""
  },
  "low-to-high cable chest press": {
    "group": "chest", 
    "movement": "cable chest press",
    "region": "upper chest", 
    "variants": [],
    "notes": ""
  },
  "wide grip lat pull down": {
    "group": "back", 
    "movement": "lat pulldown",
    "region": "upper back", 
    "variants": ["wide bar", "mag grip", "round handle"], 
    "notes": ""
  },
  "lat pulldown": {
    "group": "back", 
    "movement": "lat pulldown",
    "region": "neutral", 
    "variants": ["wide bar", "mag grip", "neutral handle"],
    "notes": ""
  },
  "narrow grip lat pulldown": {
    "group": "back", 
    "movement": "lat pulldown",
    "region": "lats", 
    "variants": ["wide bar", "triangle grip", "mag grip"], 
    "notes": ""
  },
  "single hand lat pull down": {
    "group": "back", 
    "movement": "single hand lat pulldown",
    "region": "lats", 
    "variants": [], 
    "notes": ""
  },
  "underhand lat pull down": {
    "group": "back", 
    "movement": "underhand lat pulldown",
    "region": "lats", 
    "variants": ["standard "], 
    "notes": ""
  },
  "wide grip pull ups": {
    "group": "back", 
    "movement": "pull ups",
    "region": "upper back", 
    "variants": [], 
    "notes": ""
  },
  "pull ups": {
    "group": "back", 
    "movement": "pull ups",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "underhand pull ups": {
    "group": "back", 
    "movement": "pull ups",
    "region": "lats", 
    "variants": [], 
    "notes": ""
  },
  "wide grip seated row": {
    "group": "back", 
    "movement": "seated row",
    "region": "upper back", 
    "variants": ["wide bar", "mag grip", "round handle"], 
    "notes": ""
  },
  "seated row": {
    "group": "back", 
    "movement": "seated row",
    "region": "neutral", 
    "variants": ["triangle grip", "mag grip", "neutral handle", "wide bar"],
    "notes": ""
  },
  "narrow grip seated row": {
    "group": "back", 
    "movement": "seated row",
    "region": "lats", 
    "variants": ["triangle grip", "wide bar"], 
    "notes": ""
  },
  "wide grip machine row": {
    "group": "back", 
    "movement": "machine row",
    "region": "upper back", 
    "variants": [], 
    "notes": ""
  },
  "machine row": {
    "group": "back", 
    "movement": "machine row",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "narrow grip machine row": {
    "group": "back", 
    "movement": "machine row",
    "region": "lats", 
    "variants": [], 
    "notes": ""
  },
  "wide grip t-bar row": {
    "group": "back", 
    "movement": "t-bar row",
    "region": "upper back", 
    "variants": [], 
    "notes": ""
  },
  "t-bar row": {
    "group": "back", 
    "movement": "t-bar row",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "narrow grip t-bar row": {
    "group": "back", 
    "movement": "t-bar row",
    "region": "lats", 
    "variants": [], 
    "notes": ""
  },
  "wide grip barbell row": {
    "group": "back", 
    "movement": "barbell row",
    "region": "upper back", 
    "variants": [], 
    "notes": ""
  },
  "barbell row": {
    "group": "back", 
    "movement": "barbell row",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "underhand barbell row": {
    "group": "back", 
    "movement": "barbell row",
    "region": "lats", 
    "variants": [], 
    "notes": ""
  },
  "single-arm cable row": {
    "group": "back", 
    "movement": "single-arm cable row",
    "region": "lats", 
    "variants": [], 
    "notes": ""
  },
  "lat pullover": {
    "group": "back", 
    "movement": "lat pullover",
    "region": "lats", 
    "variants": ["revolving bar attachment","straight bar ", "rope "], 
    "notes": ""
  },
  "single arm lat pullover": {
    "group": "back", 
    "movement": "single arm lat pullover",
    "region": "lats", 
    "variants": [], 
    "notes": ""
  },
  "reverse pec-dec fly": {
    "group": "back", 
    "movement": "reverse pec-dec fly",
    "region": "upper back", 
    "variants": [], 
    "notes": ""
  },
  "face pulls": {
    "group": "back", 
    "movement": "face pulls",
    "region": "upper back", 
    "variants": [], 
    "notes": ""
  },
  "low-bar barbell squat": {
    "group": "legs", 
    "movement": "barbell squat",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "barbell squat": {
    "group": "legs", 
    "movement": "barbell squat",
    "region": "quads", 
    "variants": [], 
    "notes": ""
  },
  "hack squat": {
    "group": "legs", 
    "movement": "hack squat",
    "region": "quads", 
    "variants": [], 
    "notes": ""
  },
  "high-foot hack squat": {
    "group": "legs", 
    "movement": "hack squat",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "smith machine squat": {
    "group": "legs", 
    "movement": "smith machine squat",
    "region": "quads", 
    "variants": [], 
    "notes": ""
  },
  "low-bar smith machine squat": {
    "group": "legs", 
    "movement": "smith machine squat",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "close bulgarian split squat": {
    "group": "legs", 
    "movement": "bulgarian split squat",
    "region": "quads", 
    "variants": [], 
    "notes": ""
  },
  "bulgarian split squat": {
    "group": "legs", 
    "movement": "bulgarian split squat",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "extended bulgarian split squat": {
    "group": "legs", 
    "movement": "bulgarian split squat",
    "region": "hamstrings", 
    "variants": [], 
    "notes": ""
  },
  "front squat": {
    "group": "legs", 
    "movement": "front squat",
    "region": "quads", 
    "variants": ["barbell", "dumbell", "smith machine"], 
    "notes": ""
  },
  "romanian deadlift": {
    "group": "legs", 
    "movement": "romanian deadlift",
    "region": "hamstrings", 
    "variants": ["barbell", "dumbell", "smith machine"], 
    "notes": ""
  },
  "deadlift": {
    "group": "legs", 
    "movement": "deadlift",
    "region": "hamstrings", 
    "variants": [], 
    "notes": ""
  },
  "leg press": {
    "group": "legs", 
    "movement": "leg press",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "high-foot leg press": {
    "group": "legs", 
    "movement": "leg press",
    "region": "quads", 
    "variants": [], 
    "notes": ""
  }, 
  "low-foot leg press": {
    "group": "legs", 
    "movement": "leg press",
    "region": "hamstrings", 
    "variants": [], 
    "notes": ""
  },
  "machine leg press": {
    "group": "legs", 
    "movement": "machine leg press",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "high-foot machine leg press": {
    "group": "legs", 
    "movement": "machine leg press",
    "region": "quads", 
    "variants": [], 
    "notes": ""
  },
  "low-foot machine leg press": {
    "group": "legs", 
    "movement": "machine leg press",
    "region": "hamstrings", 
    "variants": [], 
    "notes": ""
  },
  "leg extension": {
    "group": "legs", 
    "movement": "leg extension",
    "region": "quads", 
    "variants": [], 
    "notes": ""
  },
  "single leg extension": {
    "group": "legs", 
    "movement": "single leg extension",
    "region": "quads", 
    "variants": [], 
    "notes": ""
  },
  "seated leg curl": {
    "group": "legs", 
    "movement": "seated leg curl",
    "region": "hamstrings", 
    "variants": [], 
    "notes": ""
  },
  "lying leg curl": {
    "group": "legs", 
    "movement": "lying leg curl",
    "region": "hamstrings", 
    "variants": [], 
    "notes": ""
  },
  "military press": {
    "group": "shoulders",
    "movement": "military press",
    "group": "shoulders", 
    "region": "front delts", 
    "variants": ["standing", "seated"], 
    "notes": ""
  },
  "dumbell overhead press": {
    "group": "shoulders",
    "movement": "dumbell overhead press",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "wide dumbell overhead press": {
    "group": "shoulders",
    "movement": "dumbell overhead press",
    "region": "side delts", 
    "variants": [], 
    "notes": ""
  },
  "narrow dumbell overhead press": {
    "group": "shoulders",
    "movement": "dumbell overhead press",
    "region": "front delts", 
    "variants": [], 
    "notes": ""
  },
  "smith machine overhead press": {
    "group": "shoulders",
    "movement": "smith machine overhead press",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "narrow smith machine overhead press": {
    "group": "shoulders",
    "movement": "smith machine overhead press",
    "region": "front delts", 
    "variants": [], 
    "notes": ""
  },
  "wide smith machine overhead press": {
    "group": "shoulders",
    "movement": "smith machine overhead press",
    "region": "side delts", 
    "variants": [], 
    "notes": ""
  },
  "cable front raise": {
    "group": "shoulders",
    "movement": "cable front raise",
    "region": "front delts", 
    "variants": [], 
    "notes": ""
  },
  "dumbell front raise": {
    "group": "shoulders",
    "movement": "dumbell front raise",
    "region": "front delts", 
    "variants": [], 
    "notes": ""
  },
  "cable lateral raise": {
    "group": "shoulders",
    "movement": "cable lateral raise",
    "region": "side delts", 
    "variants": [], 
    "notes": ""
  },
  "dumbell lateral raise": {
    "group": "shoulders",
    "movement": "dumbell lateral raise",
    "region": "side delts", 
    "variants": [], 
    "notes": ""
  },
  "machine lateral raise": {
    "group": "shoulders",
    "movement": "machine lateral raise",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "dumbell curl": {
    "group": "biceps",
    "movement": "dumbell curl",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "dumbell hammer curl": {
    "group": "biceps",
    "movement": "dumbell curl",
    "region": "brachialis", 
    "variants": [], 
    "notes": ""
  },
  "cable curl": {
    "group": "biceps",
    "movement": "cable curl",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "rope curl": {
    "group": "biceps",
    "movement": "cable curl",
    "region": "brachialis", 
    "variants": [], 
    "notes": ""
  },
  "cable drag curl": {
    "group": "biceps",
    "movement": "cable curl",
    "region": "long head", 
    "variants": ["d-handles", "straight bar", "rotating bar"], 
    "notes": ""
  },
  "preacher curl": {
    "group": "biceps",
    "movement": "preacher curl",
    "region": "short head", 
    "variants": ["ez-bar", "straight bar", "dumbell"], 
    "notes": ""
  },
  "incline curl": {
    "group": "biceps",
    "movement": "incline curl",
    "region": "long head", 
    "variants": [], 
    "notes": ""
  },
  "concentration curl": {
    "group": "biceps",
    "movement": "concentration curl",
    "region": "short head", 
    "variants": [], 
    "notes": ""
  },
  "barbell curl": {
    "group": "biceps",
    "movement": "barbell curl",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "machine curl": {
    "group": "biceps",
    "movement": "machine curl",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "machine preacher curl": {
    "group": "biceps",
    "movement": "machine preacher curl",
    "region": "short head", 
    "variants": [], 
    "notes": ""
  },
  "skullcrusher": {
    "group": "triceps",
    "movement": "skullcrusher",
    "region": "neutral", 
    "variants": ["dumbell", "ez-bar", "straight bar"], 
    "notes": ""
  },
  "incline skullcrusher": {
    "group": "triceps",
    "movement": "skullcrusher",
    "region": "long head", 
    "variants": ["dumbell", "ez-bar", "straight bar"], 
    "notes": ""
  },
  "tricep pushdown": {
    "group": "triceps",
    "movement": "tricep pushdown",
    "region": "neutral", 
    "variants": ["straight bar", "rotating bar"], 
    "notes": ""
  },
  "rope tricep pushdown": {
    "group": "triceps",
    "movement": "tricep pushdown",
    "region": "medial head", 
    "variants": [], 
    "notes": ""
  },
  "overhead tricep extension": {
    "group": "triceps",
    "movement": "overhead tricep extension",
    "region": "long head", 
    "variants": [""], 
    "notes": ""
  },
  "rope overhead tricep extension": {
    "group": "triceps",
    "movement": "overhead tricep extension",
    "region": "medial head", 
    "variants": [], 
    "notes": ""
  },
  "cross body tricep extension": {
    "group": "triceps",
    "movement": "cross body tricep extension",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  },
  "machine tricep extension": {
    "group": "triceps",
    "movement": "machine tricep extension",
    "region": "neutral", 
    "variants": [], 
    "notes": ""
  }, 
  "machine shrugs": {
    "group": "traps",
    "movement": "shrugs",
    "region": "neutral",
    "variants": [],
    "notes": ""
  }, 
  "smith machine shrugs": {
    "group": "traps",
    "movement": "shrugs",
    "region": "neutral",
    "variants": [],
    "notes": ""
  },
  "barbell shrugs": {
    "group": "traps",
    "movement": "shrugs",
    "region": "neutral",
    "variants": [],
    "notes": ""
  },
  "dumbell shrugs": {
    "group": "traps",
    "movement": "shrugs",
    "region": "neutral",
    "variants": [],
    "notes": ""
  },
  "cable rear delt fly": {
    "group": "rear deltoids",
    "movement": "rear delt fly",
    "region": "neutral",
    "variants": [],
    "notes": ""
  },
  "dumbell rear delt fly": {
    "group": "rear deltoids",
    "movement": "rear delt fly",
    "region": "neutral",
    "variants": [],
    "notes": ""
  },
  "straight bar forearm curl": {
    "group": "forearms",
    "movement": "forearm curl",
    "region": "neutral",
    "variants": [],
    "notes": ""
  },
  "cable forearm curl": {
    "group": "forearms",
    "movement": "forearm curl",
    "region": "neutral",
    "variants": [],
    "notes": ""
  },
  "dumbell forearm curl": {
    "group": "forearms",
    "movement": "forearm curl",
    "region": "neutral",
    "variants": [],
    "notes": ""
  },
  "machine calf raise": {
    "group": "calves",
    "movement": "calf raise",
    "region": "neutral",
    "variants": [],
    "notes": ""
  },
  "smith machine calf raise": {
    "group": "calves",
    "movement": "calf raise",
    "region": "neutral",
    "variants": [],
    "notes": ""
  },
  "dumbell calf raise": {
    "group": "calves",
    "movement": "calf raise",
    "region": "neutral",
    "variants": [],
    "notes": ""
  },
  "barbell calf raise": {
    "group": "calves",
    "movement": "calf raise",
    "region": "neutral",
    "variants": [],
    "notes": ""
  },
  "cable crunch": {
    "group": "abs",
    "movement": "abs",
    "region": "neutral",
    "variants": [],
    "notes": ""
  },
  "dumbell side bend": {
    "group": "abs",
    "movement": "abs",
    "region": "neutral",
    "variants": [],
    "notes": ""
  },
  "weighted leg raise": {
    "group": "abs",
    "movement": "abs",
    "region": "neutral",
    "variants": [],
    "notes": ""
  },
  "weighted situps": {
    "group": "abs",
    "movement": "abs",
    "region": "neutral",
    "variants": [],
    "notes": ""
  }
}

const groups = {
  "chest": {
    "regions": ["upper chest", "lower chest"],
    "upperStim": [110, 120, 130, 140, 150, 160], 
    "lowerStim": [60, 70, 80, 90, 110, 130], 
    "compounds": ["barbell bench press", "dumbell bench press", "smith machine press", "machine chest press", "weighted dips"],
    "isolations": ["cable fly", "pec-dec fly", "cable chest press"], 
    "neutral": {
      compound: ["neutral", "neutral", "neutral"],
      isolation: ['neutral', 'neutral', 'neutral'] 
    }, 
    "upper chest": {
      compound: ["upper chest", "neutral", "lower chest"],
      isolation: ["upper chest", "neutral", "lower chest"]
    }, 
    "lower chest": {
      compound: ["lower chest", "neutral", "upper chest"],
      isolation: ["lower chest", "neutral", "upper chest"]
    },  
    "upper chest+": {
      compound: ["upper chest", "upper chest", "neutral"],
      isolation: ["upper chest", "upper chest", "neutral"],
    }, 
    "lower chest+": {
      compound: ["neutral", "lower chest", "lower chest"],
      isolation: ["neutral", "lower chest", "lower chest"],
    }, 
    "bias": "neutral"
  }, 
  "back": {
    "regions": ["upper back", "lats"],
    "upperStim": [110, 120, 130, 140, 150, 160], 
    "lowerStim": [60, 70, 80, 90, 110, 130], 
    "compounds": ["lat pulldown", "pull ups", "seated row", "machine row", "t-bar row", "barbell row", "single-arm cable row"],
    "isolations": ["lat pullover", "reverse pec-dec fly", "face pulls", "single arm lat pullover"],
    "neutral": {
      compound: ["neutral", "neutral", "neutral"],
      isolation: ['upper back', 'lats', 'upper back'] 
    }, 
    "lats": {
      compound: ["lats", "neutral", "upper back"],
      isolation: ['lats', 'upper back', 'lats'] 
    }, 
    "upper back": {
      compound: ["upper back", "neutral", "lats"],
      isolation: ['upper back', 'lats', 'upper back'] 
    }, 
    "upper back+": {
      compound: ["upper back", "upper back", "neutral"],
      isolation: ['upper back', 'upper back', 'lats'] 
    }, 
    "lats+": {
      compound: ["lats", "lats", "neutral"],
      isolation: ['lats', 'lats', 'upper back'] 
    }, 
    "bias": "neutral"
  }, 
  "legs": {
    "regions": ["quads", "hamstrings"],
    "upperStim": [120, 140, 160, 180, 200, 220], 
    "lowerStim": [70, 80, 90, 100, 110, 120], 
    "compounds": ["hack squat", "barbell squat", "smith machine squat", "romanian deadlift", "leg press", "machine leg press", "deadlift", "bulgarian split squat", "front squat"],
    "isolations": ["leg extension", "seated leg curl", "lying leg curl", "single leg extension"], 
    "hamstrings": {
      compound: ["hamstrings", "quads", "hamstrings"],
      isolation: ["hamstrings", "quads"],
    }, 
    "quads": {
      compound: ["quads", "hamstrings", "quads"],
      isolation: ["quads", "hamstrings"],
    }, 
    "hamstrings+": {
      compound: ["hamstrings", "hamstrings", "quads"],
      isolation: ["hamstrings", "quads"],
    }, 
    "quads+": {
      compound: ["quads", "quads", "hamstrings"],
      isolation: ["quads", "hamstrings"],
    }, 
    "neutral": {
      compound: ["quads", "hamstrings", "hamstrings"],
      isolation: ["quads", "hamstrings"],
    }, 
    "bias": "neutral"
  },
  "shoulders": {
    "regions": ["front delts", "side delts"],
    "upperStim": [70, 90, 110, 120, 130, 140], 
    "lowerStim": [25, 35, 45, 55, 65, 75], 
    "compounds": ["dumbell overhead press", "smith machine overhead press", "military press"],
    "isolations": ["cable lateral raise", "cable front raise", "dumbell lateral raise", "dumbell front raise"], 
    "neutral": {
      compound: ["neutral", "neutral", "neutral"],
      isolation: ["side delts", "front delts"],
    }, 
    "front delts": {
      compound: ["front delts"],
      isolation: ["front delts", "side delts"],
    },  
    "side delts": {
      compound: ["neutral"],
      isolation: ["side delts"],
    },
    "bias": "neutral"
  }, 
  "biceps": {
    "regions": ["short head", "long head", "brachialis"],
    "upperStim": [50, 60, 70, 80, 90, 100], 
    "lowerStim": [20, 30, 40, 50, 60, 70],
    "compounds": [],
    "isolations": ["incline curl", "preacher curl", "dumbell curl", "cable curl", "concentration curl", "barbell curl", "machine curl", "machine preacher curl"], 
    "neutral": {
      compound: [],
      isolation: ["neutral", "brachialis", "neutral"],
    },
    "short head": {
      compound: [],
      isolation: ["short head", "neutral", "brachialis"],
    },
    "long head": {
      compound: [],
      isolation: ["long head", "neutral", "brachialis"],
    },
    "brachialis": {
      compound: [],
      isolation: ["brachialis", "neutral"],
    },
    "bias": "neutral"
  }, 
  "triceps": {
    "regions": ["long head", "medial head", "lateral head"],
    "upperStim": [30, 40, 50, 60, 70, 80], 
    "lowerStim": [20, 30, 40, 50, 60, 70],
    "compounds": [],
    "isolations": ["tricep pushdown", "overhead tricep extension", "skullcrusher", "cross body tricep extension", "machine tricep extension"], 
    "neutral": {
      compound: [],
      isolation: ["neutral"],
    }, 
    "long head": {
      compound: [],
      isolation: ["long head", "neutral"],
    }, 
    "lateral head": {
      compound: [],
      isolation: ["lateral head", "neutral"],
    }, 
    "medial head": {
      compound: [],
      isolation: ["medial head", "neutral"],
    },  
    "bias": "neutral"
  }, 
}

const accesoryGroups = {
  "side deltoids": {
    "size": 5, 
    "regions": ["side deltoids"],
    "compounds": [],
    "isolations": ["cable lateral raise", "dumbell lateral raise", "machine lateral raise"], 
  },
  "traps": {
    "size": 5, 
    "regions": ["traps"],
    "compounds": [],
    "isolations": ["shrugs"], 
  },
  "rear deltoids": {
    "size": 5, 
    "regions": ["rear delts"],
    "compounds": [],
    "isolations": ["rear delt fly"]
  },
  "forearms": {
    "size": 5, 
    "regions": ["forearms"],
    "compounds": [],
    "isolations": ["forearm curl"]
  },
  "calves": {
    "size": 5, 
    "regions": ["calves"],
    "compounds": [],
    "isolations": ["calf raise"]
  },
  "abs": {
    "size": 5, 
    "regions": ["abs"],
    "compounds": [],
    "isolations": ["abs"]
  }
}

const restTimes = [
  [1.75, 2.25, 2.75, 3.25, 3.75],
  [1.50, 2.00, 2.50, 3.00, 3.50],
  [1.25, 1.75, 2.25, 2.75, 3.25],
  [1.00, 1.50, 2.00, 2.50, 3.00],
  [.50, 1.00, 1.50, 2.00, 2.50]
];

const repRange = [
  [2, 5],
  [6, 10],
  [8, 12],
  [10, 15],
  [12, 20]
];

const baseSplits = [
  [["chest shoulders triceps", "back biceps", "legs"], "p1"], 
   [["chest triceps",  "back biceps", "legs shoulders"], "p2"], 
    [["back biceps", "chest shoulders triceps", "legs"], "p1"], 
    [["back biceps", "chest triceps", "legs shoulders"], "p2"], 
    [["chest back", "shoulders biceps triceps", "legs"], "a1"], 
    [["shoulders biceps triceps", "chest back", "legs"], "a1"], 
    [["chest back", "legs shoulders", "biceps triceps"], "a2"],
    [["chest triceps", "back biceps", "legs", "shoulders"], "p3"], 
    [["back biceps", "chest triceps", "legs", "shoulders"], "p3"], 
    [["back biceps", "chest triceps", "shoulders", "legs"], "p3"], 
    [["chest triceps", "back", "legs", "shoulders biceps"], "b1"], 
    [["legs", "back", "chest triceps", "shoulders biceps"], "b1"], 
    [["back biceps", "chest", "legs", "shoulders triceps"], "b2"],
    [["legs", "chest", "back biceps", "shoulders triceps"], "b2"], 
    [["chest", "back", "shoulders biceps triceps", "legs"], "b3"], 
    [["chest", "back", "legs", "shoulders biceps triceps"], "b3"], 
    [["back", "chest", "legs", "shoulders biceps triceps"], "b3"], 
    [["chest back", "legs", "biceps triceps", "shoulders"], "a3"],
    [["chest back", "shoulders", "biceps triceps", "legs"], "a3"],
    [["chest back", "biceps triceps", "shoulders", "legs"], "a3"], 
]

const liftTypeSeq = {
  20: {
    2: [1, 1, 2, 2, 3, 3],  
    3: [1, 1, 2, 3, 3], 
    4: [1, 2, 3, 3],
  },
  40: {
    2: [1, 1, 2, 2, 3, 3],  
    3: [1, 2, 2, 3, 3], 
    4: [1, 2, 3, 3],
  },
  60: {
    2: [1, 2, 3, 3, 3, 3], 
    3: [2, 3, 3, 3, 3],
    4: [2, 3, 3, 3], 
  },
  80: {
    2: [2, 3, 3, 3, 3, 3],
    3: [2, 3, 3, 3, 3],
    4: [3, 3, 3, 3], 
  }, 
  100: {
    2: [3, 3, 3, 3, 3, 3],
    3: [3, 3, 3, 3, 3],
    4: [3, 3, 3, 3], 
  }
}

const compoundMults = {
  "chest": [1/3, 2/3], 
  "back": [1/3, 3/4], 
  "legs": [1/3, 1/2], 
  "shoulders": [1/4, 1/2], 
  "biceps": [0, 0], 
  "triceps": [0, 0], 
}
const stimVars = {
  1: {
    "k": 1.2,
    "RPE0": 7.5
  }, 
  2: {
    "k": 1.1, 
    "RPE0": 7.0
  }, 
  3: {
    "k": 1.0, 
    "RPE0": 6.5
  }, 
  4: {
    "k": 0.9, 
    "RPE0": .6
  }, 
  5: {
    "k": .8, 
    "RPE0": 5.5
  }, 
}

const liftData = [restTimes, repRange, variants, movements, groups, baseSplits, liftTypeSeq, compoundMults, stimVars, accesoryGroups, accesories];

module.exports = liftData;