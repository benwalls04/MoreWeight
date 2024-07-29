const staticData = {
  movements: {
    "barbell bench press": {
      "primary": "chest", 
      "secondary": ["triceps, shoulders"], 
      "sequences": {
        "b": [7, 7, 8, 8],
        "i": [8, 8, 9, 9],
        "a": [9, 9, 9, 9]
      }, 
      "variants": {
        n: 'Flat bench.', 
        u: 'Incline bench.',
      }, 
    }, 
    "dumbell bench press": {
      "primary": "chest", 
      "secondary": ["triceps, shoulders"], 
      "sequences": {
        "b": [7, 8, 8, 9],
        "i": [8, 8, 9, 9],
        "a": [8, 9, 9, 9]
      }, 
      "variants": {
        n: 'Flat bench.', 
        u: 'Incline bench.',
        l: 'Decline bench.',
      }, 
    }, 
    "smith machine bench press": {
      "primary": "chest", 
      "secondary": ["triceps, shoulders"], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      }, 
      "variants": {
        n: 'Flat bench.', 
        u: 'Incline bench.', 
        l: 'Decline bench.', 
      }
    }, 
    "machine chest press": {
      "primary": "chest", 
      "secondary": ["triceps, shoulders"], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      }, 
      "variants": {
        n: '', 
        u: 'Low-to-high arm path', 
        l: 'High-to-low arm path', 
      }, 
    }, 
    "weighted dips": {
      "primary": "chest", 
      "secondary": ["triceps, shoulders"], 
      "sequences": {
        "b": [7, 8, 8, 9],
        "i": [8, 8, 9, 9],
        "a": [8, 9, 9, 9]
      }, 
      "variants": {
        l: '',
      }, 
    }, 
    "cable fly": {
      "primary": "chest", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      "variants": {
        n: '',
        u: 'Low-to-high arm path.',
        l: 'High-to-low arm path.',
      }, 
    }, 
    "pec-dec fly": {
      "primary": "chest", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      "variants": {
        n: ''
      }, 
    }, 
    "cable press": {
      "primary": "chest", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      "variants": {
        n: '', 
        u: 'Low-to-high arm path.',
        l: 'High-to-low arm path.',
      },
    }, 
    "lat pulldown": {
      "primary": "back", 
      "secondary": ["biceps"], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      "variants": {
        n: 'Neutral grip.', 
        l: 'Narrow grip. Resist leaning back.', 
        u: 'Wide grip. Maintain a slight lean back.',
      }, 
    }, 
    "pull ups": {
      "primary": "back", 
      "secondary": ["biceps"], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      }, 
      "variants": {
        n: 'Neutral grip.',
        l: 'Narrow underhand grip.',
      },
    }, 
    "seated cable row": {
      "primary": "back", 
      "secondary": ["biceps"], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      "variants": {
        n: 'Neutral grip. Arms should start shoulder width and pull at a 45 degree path.',
        u: 'Wide overhand grip. Try for a wide arm path close to 90 degrees. Allow for a controlled backward lean when pulling the weight.', 
        l: 'Narrow grip. Imagine pulling your elbows into your hips. Maintain a slight forward lean.',
      },
    }, 
    "machine row": {
      "primary": "back", 
      "secondary": ["biceps"], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      "variants": {
        n: 'Neutral grip. Try for a 45 degree arm path', 
        l: 'Imagine pulling your elbows into your hips', 
        u: 'Try for a wide arm path close to 90 degrees', 
      },
    }, 
    "t-bar row": {
      "primary": "back", 
      "secondary": ["biceps"], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      "variants": {
        n: 'Neutral grip. Try for a 45 degree arm path', 
        l: 'Narrow grip. Imagine pulling your elbows into your hips', 
        u: 'Wide overhand grip. Try for a wide arm path close to 90 degrees', 
      },
    }, 
    "barbell row": {
      "primary": "back", 
      "secondary": ["biceps"], 
      "sequences": {
        "b": [7, 7, 8, 8],
        "i": [8, 8, 9, 9],
        "a": [9, 9, 9, 9]
      }, 
      "variants": {
        n: 'Neutral grip. Try for a 45 degree arm path', 
        l: 'Narrow grip. Imagine pulling your elbows into your hips', 
        u: 'Wide overhand grip. Try for a wide arm path close to 90 degrees',
      }, 
    },  
    "lat pullover": {
      "primary": "back", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      "variants": {
        l: ''
      },
    }, 
    "reverse pec-dec fly": {
      "primary": "back", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      "variants": {
        u: ''
      },
    }, 
    "face pulls": {
      "primary": "back",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      },
      "variants": {
        u: ''
      },
    }, 
    "barbell squat": {
      "primary": "legs", 
      "secondary": [], 
      "sequences": {
        "b": [7, 7, 8, 8],
        "i": [8, 8, 9, 9],
        "a": [9, 9, 9, 9]
      }, 
      "variants": {
        q: ''
      },
    }, 
    "hack squat": {
      "primary": "legs", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      }, 
      "variants": {
        q: ''
      },
    }, 
    "smith machine squat": {
      "primary": "legs", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      }, 
      "variants": {
        q: ''
      },
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
      "variants": {
        q: 'Keep front foot past 90 degrees with the knee.', 
        n: 'Keep front foot at 90 degrees with the knee.', 
        h: 'Keep front foot shy of 90 degrees with the knee.'
      },
    }, 
    "front squat": {
      "primary": "legs",
      "secondary": [],
      "sequences": {
        "b": [7, 7, 8, 8],
        "i": [8, 8, 9, 9],
        "a": [9, 9, 9, 9]
      },
      "variants": {
        q: ''
      },
    }, 
    "barbell romanian deadlift": {
      "primary": "legs", 
      "secondary": [], 
      "sequences": {
        "b": [7, 7, 8, 8],
        "i": [8, 8, 9, 9],
        "a": [9, 9, 9, 9]
      }, 
      "variants": {
        h: ''
      },
    }, 
    "dumbell romanian deadlift": {
      "primary": "legs", 
      "secondary": [], 
      "sequences": {
        "b": [7, 7, 8, 8],
        "i": [8, 8, 9, 9],
        "a": [9, 9, 9, 9]
      }, 
      "variants": {
        h: ''
      },
    }, 
    "deadlift": {
      "primary": "legs", 
      "secondary": ["back"], 
      "sequences": {
        "b": [7, 7, 8, 8],
        "i": [8, 8, 9, 9],
        "a": [9, 9, 9, 9]
      }, 
      "variants": {
        h: ''
      },
    }, 
    "leg press": {
      "primary": "legs", 
      "secondary": [], 
      "sequences": {
        "b": [7, 7, 8, 8],
        "i": [8, 8, 9, 9],
        "a": [9, 9, 9, 9]
      }, 
      "variants": {
        q: 'Place feet low on the platform', 
        n: 'Place feet high on the platform', 
      },
    }, 
    "barbell hip thrust": {
      "primary": "legs",
      "secondary": [],
      "sequences": {
        "b": [7, 7, 8, 8],
        "i": [8, 8, 9, 9],
        "a": [9, 9, 9, 9]
      },
      "variants": {
        h: ''
      },
    }, 
    "leg extension": {
      "primary": "legs", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      "variants": {
        q: ''
      },
    }, 
    "leg curl": {
      "primary": "legs", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      "variants": {
        h: ''
      },
    }, 
    "military press": {
      "primary": "shoulders", 
      "secondary": [], 
      "sequences": {
        "b": [7, 7, 8, 8],
        "i": [8, 8, 9, 9],
        "a": [9, 9, 9, 9]
      }, 
      "variants": {
        n: ''
      },
    }, 
    "dumbell overhead press": {
      "primary": "shoulders", 
      "secondary": [], 
      "sequences": {
        "b": [7, 7, 8, 8],
        "i": [8, 8, 9, 9],
        "a": [9, 9, 9, 9]
      }, 
      "variants": {
        n: ''
      },
    }, 
    "smith machine overhead press": {
      "primary": "shoulders", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      }, 
      "variants": {
        n: ''
      },
    }, 
    "cable front raise": {
      "primary": "shoulders", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      "variants": {
        f: ''
      }
    }, 
    "dumbell front raise": {
      "primary": "shoulders", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      }, 
      "variants": {
        f: ''
      }
    }, 
    "cable lateral raise": {
      "primary": "shoulders", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      "variants": {
        s: ''
      }
    }, 
    "dumbell lateral raise": {
      "primary": "shoulders", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      "variants": {
        s: ''
      }
    }, 
    "machine lateral raise": {
      "primary": "shoulders", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      "variants": {
        s: ''
      }
    }, 
    "dumbell curl": {
      "primary": "biceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
    }, 
    "dumbell hammer curl": {
      "primary": "biceps",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      },
    }, 
    "cable curl": {
      "primary": "biceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
    }, 
    "preacher curl": {
      "primary": "biceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
    }, 
    "incline curl": {
      "primary": "biceps", 
      "secondary": [""], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
    }, 
    "concentration curl": {
      "primary": "biceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
    }, 
    "barbell curl": {
      "primary": "biceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
    }, 
    "machine curl": {
      "primary": "biceps",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      },
      "variants": ["machine curl"]
    }, 
    "skullcrusher": {
      "primary": "triceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 7, 8, 8],
        "i": [8, 8, 9, 9],
        "a": [9, 9, 9, 9]
      }, 
    }, 
    "tricep pushdown": {
      "primary": "triceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
    }, 
    "overhead tricep extension": {
      "primary": "triceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 7, 8, 8],
        "i": [8, 8, 9, 9],
        "a": [9, 9, 9, 9]
      }, 
    },
    "cross body tricep extension": {
      "primary": "triceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      }, 
    },
    "machine tricep extension": {
      "primary": "triceps",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      },
    }
  }, 
  begginerMovements: ["barbell bench press", "dumbell bench press", "machine chest press", "pec-dec fly", "lat pulldown", "seated cable row", "machine row", "reverse pec-dec fly", "barbell squat", "hack squat", "leg press", "machine leg press", "leg extension", "seated leg curl", "lying leg curl", "dumbell overhead press", "dumbell front raise", "dumbell lateral raise", "dumbell curl", "cable curl", "preacher curl", "tricep pushdown", "machine tricep extension"], 
  accesories: {
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
  },  
  groups:{
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
      "compounds": ["lat pulldown", "pull ups", "seated cable row", "machine row", "t-bar row", "barbell row", "single-arm cable row"],
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
  }, 
  accesoryGroups: {
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
  }, 
  restTimes: [
    [1.75, 2.25, 2.75, 3.25, 3.75],
    [1.50, 2.00, 2.50, 3.00, 3.50],
    [1.25, 1.75, 2.25, 2.75, 3.25],
    [1.00, 1.50, 2.00, 2.50, 3.00],
    [.50, 1.00, 1.50, 2.00, 2.50]
  ],
  repRange: [
    [2, 6],
    [4, 8],
    [6, 10],
    [8, 12],
    [10, 14]
  ],
  baseSplits: {
    u1: [["chest back biceps triceps shoulders", "legs"]], 
    u2: [["chest back biceps triceps", "legs shoulders"]],  
    p1: [
        ["chest shoulders triceps", "back biceps", "legs"], 
        ["chest shoulders triceps", "legs", "back biceps"]
      ], 
    p2: [
        ["chest triceps", "back biceps", "legs shoulders"], 
        ["chest triceps", "legs shoulders", "back biceps"]
      ], 
    a1: [
      ["chest back", "shoulders biceps triceps", "legs"], 
      ["chest back", "legs", "shoulders biceps triceps"], 
    ],
    a2: [
      ["chest back", "legs shoulders", "biceps triceps"], 
      ["chest back", "biceps triceps", "legs shoulders"]
    ], 
    p3: [
      ["chest triceps", "back biceps", "shoulders", "legs"], 
      ["chest triceps", "legs", "shoulders", "back biceps"], 
      ["chest triceps", "shoulders", "back biceps", "legs"], 
      ["chest triceps", "shoulders", "legs", "back biceps"],
      ["chest triceps", "back biceps", "legs", "shoulders"], 
      ["chest triceps", "legs", "back biceps", "shoulders"],
    ],  
    b1: [
      ["chest triceps", "back", "shoulders biceps", "legs"], 
      ["chest triceps", "shoulders biceps", "legs", "back"],
      ["chest triceps", "back", "legs", "shoulders biceps"], 
      ["chest triceps", "legs", "back", "shoulders biceps"],
      ["chest triceps", "back", "shoulders biceps", "legs"], 
    ],
    b2: [
      ["chest", "back biceps", "shoulders triceps", "legs"],
      ["chest", "legs", "shoulders triceps", "back biceps"],
      ["chest", "shoulders triceps", "back biceps", "legs"],
      ["chest", "shoulders triceps", "legs", "back biceps"],
      ["chest", "legs", "back biceps", "shoulders triceps"],
      ["chest" , "back biceps", "legs", "shoulders triceps"],
    ], 
    b3: [
      ["chest", "back", "legs", "shoulders biceps triceps"], 
      ["chest", "back", "shoulders biceps triceps", "legs"],
      ["chest", "legs", "back", "shoulders biceps triceps"], 
      ["chest", "shoulders biceps triceps", "legs", "back"],
    ], 
    a3: [
      ["chest back", "biceps triceps", "shoulders", "legs"],
      ["chest back", "shoulders", "biceps triceps", "legs"],
      ["chest back", "legs", "biceps triceps", "shoulders"],
      ["chest back", "biceps triceps", "legs", "shoulders"],
      ["chest back", "legs", "shoulders", "biceps triceps"],
      ["chest back", "biceps triceps", "shoulders", "legs"],
    ],
  },
  stimVars: {
    2: {
      "k": 1.2,
      "RPE0": 7.5
    }, 
    4: {
      "k": 1.1, 
      "RPE0": 7.0
    }, 
    6: {
      "k": 1.0, 
      "RPE0": 6.5
    }, 
    8: {
      "k": 0.9, 
      "RPE0": .6
    }, 
    10: {
      "k": .8, 
      "RPE0": 5.5
    }, 
  },
  workoutDays:[
    "chest shoulders triceps", "back biceps", "legs", "legs shoulders", "chest back", "shoulders biceps triceps", "back shoulders", "shoulders", "chest back shoulders biceps triceps", "chest shoulders", "back", "chest"
  ], 
  groupNames: [
    "chest", "back", "legs", "shoulders", "biceps", "triceps"
  ],
  splitSamples: {
    "": "",
    u: "chest back biceps triceps shoulders.legs",
    b: "chest.back.legs.shoulders.biceps triceps", 
    a: "chest back.triceps shoulders biceps.legs",
    p: "chest triceps shoulders.back biceps.legs", 
    b1: "chest triceps.back.legs.shoulders biceps",
    b2: "chest.back biceps.shoulders triceps.legs",
    b3: "chest.back.legs.shoulders biceps triceps", 
    p1: "chest shoulders triceps.back biceps.legs", 
    p2: "chest triceps.back biceps.legs shoulders", 
    p3: "chest triceps.legs.shoulders.back biceps", 
    a1: "chest back.shoulders biceps triceps.legs", 
    a2: "chest back.legs shoulders.biceps triceps", 
    a3: "chest back.biceps triceps.shoulders.legs",
    u1: "chest back shoulders biceps triceps.legs", 
    u2: "chest back biceps triceps.legs shoulders",
  }, 
  splitTitles: {
    "": "",
    u: "upper lower",
    b: "body part split", 
    a: "arnold split",
    p: "push pull legs", 
    b1: "body part split 1",
    b2: "body part split 2",
    b3: "body part split 3", 
    p1: "push pull legs 1", 
    p2: "push pull legs 2", 
    p3: "push pull legs 3", 
    a1: "arnold split 1", 
    a2: "arnold split 2", 
    a3: "arnold split 3",
    u1: "upper lower 1", 
    u2: "upper lower 2",
  },
  sequences: {
    chest: {
      b: {
        seq: [
          {type: 'horizontal-press-0', lowerRep: 6, upperRep: 10}, 
          {type: 'horizontal-press-2', lowerRep: 8, upperRep: 12},  
          {type: 'horizontal-press-2', lowerRep: 8, upperRep: 12}, 
          {type: 'horizontal-press-2', lowerRep: 8, upperRep: 12}, 
          {type: 'horizontal-press-2', lowerRep: 8, upperRep: 12}, 
          {type: 'fly', lowerRep: 10, upperRep: 14}, 
          {type: 'fly', lowerRep: 10, upperRep: 14},   
        ], 
        order: [0, 5, 6, 1, 2, 3, 4], 
      },
      p: {
        seq: [
          {type: 'horizontal-press-0', lowerRep: 2, upperRep: 6}, 
          {type: 'horizontal-press-1', lowerRep: 4, upperRep: 8},  
          {type: 'horizontal-press-2', lowerRep: 6, upperRep: 10}, 
          {type: 'horizontal-press-2', lowerRep: 6, upperRep: 10}, 
          {type: 'horizontal-press-2', lowerRep: 6, upperRep: 10}, 
          {type: 'fly', lowerRep: 8, upperRep: 12}, 
          {type: 'fly', lowerRep: 8, upperRep: 12}, 
        ], 
        order: [0, 1, 5, 2, 3, 6, 4], 
      },
      n: {
        seq: [
          {type: 'horizontal-press-0', lowerRep: 4, upperRep: 8}, 
          {type: 'horizontal-press-1', lowerRep: 6, upperRep: 10},  
          {type: 'horizontal-press-2', lowerRep: 8, upperRep: 12}, 
          {type: 'horizontal-press-2', lowerRep: 8, upperRep: 12}, 
          {type: 'horizontal-press-2', lowerRep: 8, upperRep: 12}, 
          {type: 'fly', lowerRep: 8, upperRep: 12}, 
          {type: 'fly', lowerRep: 8, upperRep: 12}, 
        ], 
        order: [0, 2, 5, 1, 6, 3, 4], 
      }
    }, 
    back: {
      b: {
        seq: [
          {type: 'vertical-pull-0', lowerRep: 8, upperRep: 12}, 
          {type: 'horizontal-pull-0', lowerRep: 8, upperRep: 12},  
          {type: 'vertical-pull-2', lowerRep: 8, upperRep: 12}, 
          {type: 'horizontal-pull-2', lowerRep: 8, upperRep: 12}, 
          {type: 'back-iso', lowerRep: 10, upperRep: 14}, 
          {type: 'back-iso', lowerRep: 10, upperRep: 14},  
          {type: 'back-iso', lowerRep: 10, upperRep: 14}, 
        ], 
        order: [0, 1, 4, 5, 6, 2, 3], 
      },
      p: {
        seq: [
          {type: 'horizontal-pull-1', lowerRep: 4, upperRep: 8}, 
          {type: 'vertical-pull-0', lowerRep: 6, upperRep: 10}, 
          {type: 'horizontal-pull-0', lowerRep: 6, upperRep: 10},  
          {type: 'vertical-pull-1', lowerRep: 4, upperRep: 8}, 
          {type: 'back-iso', lowerRep: 8, upperRep: 12}, 
          {type: 'back-iso', lowerRep: 8, upperRep: 12},  
          {type: 'back-iso', lowerRep: 8, upperRep: 12}, 
        ], 
        order: [1, 2, 0, 4, 5, 3, 6], 
      },
      n: {
        seq: [
          {type: 'vertical-pull-0', lowerRep: 6, upperRep: 10}, 
          {type: 'horizontal-pull-0', lowerRep: 6, upperRep: 10},  
          {type: 'vertical-pull-2', lowerRep: 8, upperRep: 12}, 
          {type: 'horizontal-pull-2', lowerRep: 8, upperRep: 12}, 
          {type: 'back-iso', lowerRep: 8, upperRep: 12}, 
          {type: 'back-iso', lowerRep: 8, upperRep: 12},  
          {type: 'back-iso', lowerRep: 8, upperRep: 12}, 
        ], 
        order: [0, 1, 4, 5, 2, 3, 6], 
      }
    },
    legs: {
      b: {
        seq: [
          {type: 'knee-flexion-0', lowerRep: 8, upperRep: 12}, 
          {type: 'hip-extension-0', lowerRep: 8, upperRep: 12},  
          {type: 'knee-flexion-2', lowerRep: 8, upperRep: 12}, 
          {type: 'hip-extension-2', lowerRep: 8, upperRep: 12}, 
          {type: 'leg-iso', lowerRep: 10, upperRep: 14}, 
          {type: 'leg-iso', lowerRep: 10, upperRep: 14},
          {type: 'leg-iso', lowerRep: 10, upperRep: 14},   
          {type: 'leg-iso', lowerRep: 10, upperRep: 14},   
        ], 
        order: [4, 5, 0, 1, 6, 2, 3, 7], 
      },
      p: {
        seq: [
          {type: 'knee-flexion-0', lowerRep: 2, upperRep: 6}, 
          {type: 'hip-extension-0', lowerRep: 6, upperRep: 10},  
          {type: 'knee-flexion-1', lowerRep: 6, upperRep: 10}, 
          {type: 'hip-extension-2', lowerRep: 6, upperRep: 10}, 
          {type: 'leg-iso', lowerRep: 10, upperRep: 14}, 
          {type: 'leg-iso', lowerRep: 10, upperRep: 14}, 
          {type: 'leg-iso', lowerRep: 10, upperRep: 14},  
          {type: 'leg-iso', lowerRep: 10, upperRep: 14},   
        ], 
        order: [0, 1, 4, 5, 2, 3, 6, 7],  
      },
      n: {
        seq: [
          {type: 'knee-flexion-0', lowerRep: 6, upperRep: 10}, 
          {type: 'hip-extension-0', lowerRep: 6, upperRep: 10},  
          {type: 'knee-flexion-1', lowerRep: 8, upperRep: 12}, 
          {type: 'hip-extension-2', lowerRep: 8, upperRep: 12}, 
          {type: 'leg-iso', lowerRep: 8, upperRep: 12}, 
          {type: 'leg-iso', lowerRep: 8, upperRep: 12},  
          {type: 'leg-iso', lowerRep: 10, upperRep: 14},  
          {type: 'leg-iso', lowerRep: 10, upperRep: 14},  
        ], 
        order: [0, 1, 4, 5, 6, 2, 3, 7],  
      }
    },
    shoulders: {
      seq: [
        {type: 'vertical-press-0', lowerRep: 6, upperRep: 10}, 
        {type: 'vertical-press-1', lowerRep: 6, upperRep: 10},  
        {type: 'shoulder-iso', lowerRep: 8, upperRep: 12}, 
        {type: 'shoulder-iso', lowerRep: 8, upperRep: 12},  
        {type: 'shoulder-iso', lowerRep: 8, upperRep: 12},  
      ], 
      order: [0, 2, 3, 1, 4],
    },
    biceps: {
      seq: [
        {type: 'curl', lowerRep: 8, upperRep: 12}, 
        {type: 'curl', lowerRep: 8, upperRep: 12},  
        {type: 'curl', lowerRep: 8, upperRep: 12}, 
        {type: 'curl', lowerRep: 8, upperRep: 12},  
      ], 
      order: [0, 1, 2, 3],
    }, 
    triceps: {
      seq: [
        {type: 'extension', lowerRep: 8, upperRep: 12}, 
        {type: 'extension', lowerRep: 8, upperRep: 12},  
        {type: 'extension', lowerRep: 8, upperRep: 12}, 
        {type: 'extension', lowerRep: 8, upperRep: 12},  
      ], 
      order: [0, 1, 2, 3],
    }
  },
  movementOrder: {
    "horizontal-press-1": ["dumbell bench press", "barbell bench press", "machine bench press"], 
    "horizontal-press-2": ["dumbell bench press", "machine chest press", "smith machine bench press", "weighted dips", "machine bench press", "cable press"], 
    "vertical-press-1": ["dumbell overhead press", "smith machine overhead press", "machine overhead press", "military press"], 
    "horizontal-pull-1": ["t-bar row", "barbell row"],
    "horizontal-pull-2": ["seated cable row", "machine row", "t-bar row", "dumbell row", "barbell row"],
    "vertical-pull-1": ["lat pulldown", "pull ups"],
    "vertical-pull-2": ["lat pulldown", "pull ups", "machine pulldown", "kneeling cable row"],
    "knee-flexion-1": ["barbell squat", "hack squat", "leg press", "front squat"],
    "knee-flexion-2": ["leg press", "bulgarian split squat", "smith machine squat"],
    "hip-extension-1": ["deadlift"],
    "hip-extension-2": ["barbell romanian deadlift", "barbell hip thrust", "dumbell romanian deadlift"],
    "curl": ["cable curl", "dumbell hammer curl", "incline dumbell curl", "preacher curl", "dumbell curl", "barbell curl", "machine curl", "concentration curl"], 
    "extension": ["tricep pushdown", "overhead tricep extension", "skullcrusher", "machine tricep extension", "cross body tricep extension"], 
    "fly": ["pec-dec fly", "cable fly"], 
    "back-iso": ["lat pullover", "reverse pec-dec fly", "face pulls"], 
    "leg-iso": ["leg extension", "leg curl", "adductor machine", "abductor machine"], 
    "shoulder-iso": ["dumbell lateral raise", "cable lateral raise", "cable front raise", "machine lateral raise", "dumbell front raise"], 
    "side deltoid": ["dumbell lateral raise", "cable lateral raise", "machine lateral raise"], 
    "rear deltoid": ["cable rear delt fly", "reverse pec-dec fly", "face pulls", "dumbell rear delt fly"],
    "traps": ["barbell shrugs", "machine shrugs", "dumbell shrugs", "cable shrugs"],
    "forearms": ["straight bar forearm curl", "cable forearm curl"],
    "calves": ["machine calf raise", "smith machine calf raise", "dumbell calf raise", "barbell calf raise"],
    "abs": ["weighted leg raise", "weighted situps", "cable crunch", "dumbell side bend"],
  }, 
  }
  
  module.exports = staticData;