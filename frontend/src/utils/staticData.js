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
        neutral: 'flat', 
        "upper chest": 'incline',
        "lower chest": 'decline',
      }, 
      biasOrder: ['neutral', 'upper chest', 'lower chest']
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
        neutral: 'flat', 
        "upper chest": 'incline',
        "lower chest": 'decline',
      }, 
      biasOrder: ['upper chest', 'neutral', 'lower chest']
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
        neutral: 'flat', 
        "upper chest": 'incline', 
        "lower chest": 'decline', 
      }, 
      biasOrder: ['upper chest', 'neutral', 'lower chest']
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
        neutral: '', 
        "upper chest": 'low-to-high', 
        "lower chest": 'high-to-low', 
      }, 
      biasOrder: ['upper chest', 'neutral', 'lower chest']
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
        "lower chest": '',
      }, 
      biasOrder: ['lower chest', 'lower chest', 'lower chest']
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
        neutral: '',
        "upper chest": 'low-to-high',
        "lower chest": 'high-to-low',
      }, 
      biasOrder: ['lower chest', 'neutral', 'upper chest']
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
        neutral: ''
      }, 
      biasOrder: ['neutral', 'neutral', 'neutral']
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
        neutral: '', 
        "upper chest": 'low-to-high',
        "lower chest": 'high-to-low',
      },
      biasOrder: ['lower chest', 'neutral', 'upper chest']
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
        neutral: '', 
        lats: 'narrow grip', 
        "upper back": 'wide grip',
      }, 
      biasOrder: ['neutral', 'lats', 'upper back']
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
        neutral: '',
        lats: 'underhand grip',
      },
      biasOrder: ['neutral', 'neutral', 'lats']
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
        neutral: '',
        "upper back": 'wide grip', 
        lats: 'narrow grip',
      },
      biasOrder: ['upper back', 'lats', 'neutral']
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
        neutral: '', 
        lats: 'narrow arm path', 
        "upper back": 'wide arm path', 
      },
      biasOrder: ['lats', 'neutral', 'upper back']
    }, 
    "machine pulldown": {
      "primary": "back",
      "secondary": ["biceps"],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      },
      "variants": {
        neutral: '', 
        lats: 'narrow grip', 
        "upper back": 'wide grip',
      },
      biasOrder: ['neutral', 'lats', 'upper back']
    }, 
    "kneeling cable row": {
      "primary": "back",
      "secondary": ["biceps"],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      },
      "variants": {
        lats: '',
      },
      biasOrder: ['lats', 'lats', 'lats']
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
        neutral: '', 
        lats: 'narrow grip', 
        "upper back": 'wide grip', 
      },
      biasOrder: ['upper back', 'neutral', 'lats']
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
        neutral: '', 
        lats: 'narrow grip', 
        "upper back": 'wide grip',
      }, 
      biasOrder: ['neutral', 'lats', 'upper back']
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
        lats: ''
      },
      biasOrder: ['lats', 'lats', 'lats']
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
        "upper back": ''
      },
      biasOrder: ['upper back', 'upper back', 'upper back']
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
        "upper back": ''
      },
      biasOrder: ['upper back', 'upper back', 'upper back']
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
        quads: ''
      },
      biasOrder: ['quads', 'quads', 'quads']
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
        quads: ''
      },
      biasOrder: ['quads', 'quads', 'quads']
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
        quads: ''
      },
      biasOrder: ['quads', 'quads', 'quads']
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
        quads: 'far stance', 
        neutral: '', 
        hamstrings: 'close stance'
      },
      biasOrder: ['hamstrings', 'neutral', 'quads']
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
        quads: ''
      },
      biasOrder: ['quads', 'quads', 'quads']
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
        hamstrings: ''
      },
      biasOrder: ['hamstrings', 'hamstrings', 'hamstrings']
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
        hamstrings: ''
      },
      biasOrder: ['hamstrings', 'hamstrings', 'hamstrings']
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
        hamstrings: ''
      }, 
      biasOrder: ['hamstrings', 'hamstrings', 'hamstrings']
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
        quads: 'low foot', 
        neutral: 'high foot', 
      },
      biasOrder: ['neutral', 'quads', 'quads']
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
        hamstrings: ''
      },
      biasOrder: ['hamstrings', 'hamstrings', 'hamstrings']
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
        quads: ''
      },
      biasOrder: ['quads', 'quads', 'quads']
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
        hamstrings: ''
      },
      biasOrder: ['hamstrings', 'hamstrings', 'hamstrings']
    }, 
    "adductor machine": {
      "primary": "legs",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      },
      "variants": {
        neutral: ''
      }, 
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "abductor machine": {
      "primary": "legs",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      },
      "variants": {
        neutral: ''
      }, 
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "military press": {
      "primary": "shoulders", 
      "secondary": ["triceps"], 
      "sequences": {
        "b": [7, 7, 8, 8],
        "i": [8, 8, 9, 9],
        "a": [9, 9, 9, 9]
      }, 
      "variants": {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "dumbell overhead press": {
      "primary": "shoulders", 
      "secondary": ["triceps"], 
      "sequences": {
        "b": [7, 7, 8, 8],
        "i": [8, 8, 9, 9],
        "a": [9, 9, 9, 9]
      }, 
      "variants": {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "smith machine overhead press": {
      "primary": "shoulders", 
      "secondary": ["triceps"], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      }, 
      "variants": {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "machine overhead press": {
      "primary": "shoulders", 
      "secondary": ["triceps"], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      }, 
      "variants": {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
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
        neutral: ''
      }, 
      biasOrder: ['neutral', 'neutral', 'neutral']
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
        neutral: ''
      }, 
      biasOrder: ['neutral', 'neutral', 'neutral']
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
        neutral: ''
      }, 
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "dumbell lateral raise": {
      "primary": "shoulders", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "machine lateral raise": {
      "primary": "shoulders", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "dumbell curl": {
      "primary": "biceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "dumbell hammer curl": {
      "primary": "biceps",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "incline dumbell curl": {
      "primary": "biceps",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "cable curl": {
      "primary": "biceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "preacher curl": {
      "primary": "biceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "incline curl": {
      "primary": "biceps", 
      "secondary": [""], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "concentration curl": {
      "primary": "biceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "barbell curl": {
      "primary": "biceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "machine curl": {
      "primary": "biceps",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "skullcrusher": {
      "primary": "triceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 7, 8, 8],
        "i": [8, 8, 9, 9],
        "a": [9, 9, 9, 9]
      }, 
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "tricep pushdown": {
      "primary": "triceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      }, 
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "cable overhead extension": {
      "primary": "triceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 7, 8, 8],
        "i": [8, 8, 9, 9],
        "a": [9, 9, 9, 9]
      }, 
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    },
    "crossbody extension": {
      "primary": "triceps", 
      "secondary": [], 
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      }, 
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    },
    "machine tricep extension": {
      "primary": "triceps",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 11]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "machine lateral raise": {
      "primary": "side deltoids",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "machine shrugs": {
      "primary": "traps",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "smith machine shrugs": {
      "primary": "traps",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "barbell shrugs": {
      "primary": "traps",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "dumbell shrugs": {
      "primary": "traps",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "cable rear delt fly": {
      "primary": "rear deltoids",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "dumbell rear delt fly": {
      "primary": "rear deltoids",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "barbell forearm curl": {
      "primary": "forearms",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      },
      variants: {
        nneutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "cable forearm curl": {
      "primary": "forearms",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "machine calf raise": {
      "primary": "calves",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "smith machine calf raise": {
      "primary": "calves",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "barbell calf raise": {
      "primary": "calves",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      },
      biasOrder: ['neutral', 'neutral', 'neutral'],
      variants: {
        neutral: ''
      },
    }, 
    "dumbell calf raise": {
      "primary": "calves",
      "secondary": [],
      "sequences": {
        "b": [7, 8, 9, 9],
        "i": [8, 9, 9, 10],
        "a": [9, 9, 10, 10]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "cable crunch": {
      "primary": "abs",
      "secondary": [],
      "sequences": {
        "b": [8, 8, 8, 8],
        "i": [8, 8, 8, 8],
        "a": [8, 8, 8, 8]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "dumbell side bend": {
      "primary": "abs",
      "secondary": [],
      "sequences": {
        "b": [8, 8, 8, 8],
        "i": [8, 8, 8, 8],
        "a": [8, 8, 8, 8]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "weighted leg raise": {
      "primary": "abs",
      "secondary": [],
      "sequences": {
        "b": [8, 8, 8, 8],
        "i": [8, 8, 8, 8],
        "a": [8, 8, 8, 8]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
    "weighted situps": {
      "primary": "abs",
      "secondary": [],
      "sequences": {
        "b": [8, 8, 8, 8],
        "i": [8, 8, 8, 8],
        "a": [8, 8, 8, 8]
      },
      variants: {
        neutral: ''
      },
      biasOrder: ['neutral', 'neutral', 'neutral']
    }, 
  }, 
  begginerMovements: ["barbell bench press", "dumbell bench press", "machine chest press", "pec-dec fly", "lat pulldown", "seated cable row", "machine row", "reverse pec-dec fly", "barbell squat", "hack squat", "leg press", "machine leg press", "leg extension", "seated leg curl", "lying leg curl", "dumbell overhead press", "dumbell front raise", "dumbell lateral raise", "dumbell curl", "cable curl", "preacher curl", "tricep pushdown", "machine tricep extension"],   
  groups:{
    "chest": {
      "regions": ["upper chest", "lower chest"],
      "upperStim": [110, 130, 150], 
      "lowerStim": [60, 80, 110], 
      "compounds": ["barbell bench press", "dumbell bench press", "smith machine press", "machine chest press", "weighted dips"],
      "isolations": ["cable fly", "pec-dec fly", "cable chest press"], 
    }, 
    "back": {
      "regions": ["upper back", "lats"],
      "upperStim": [110, 130, 150], 
      "lowerStim": [60, 80, 110], 
      "compounds": ["lat pulldown", "pull ups", "seated cable row", "machine row", "t-bar row", "barbell row", "single-arm cable row"],
      "isolations": ["lat pullover", "reverse pec-dec fly", "face pulls", "single arm lat pullover"],
    }, 
    "legs": {
      "regions": ["quads", "hamstrings"],
      "upperStim": [140, 180, 220], 
      "lowerStim": [90, 110, 130], 
      "compounds": ["hack squat", "barbell squat", "smith machine squat", "romanian deadlift", "leg press", "machine leg press", "deadlift", "bulgarian split squat", "front squat"],
      "isolations": ["leg extension", "leg curl", "leg curl", "single leg extension"], 
    },
    "shoulders": {
      "regions": ["front delts", "side delts"],
      "upperStim": [70, 110, 130], 
      "lowerStim": [25, 45, 65], 
      "compounds": ["dumbell overhead press", "smith machine overhead press", "military press"],
      "isolations": ["cable lateral raise", "cable front raise", "dumbell lateral raise", "dumbell front raise"], 
    }, 
    "biceps": {
      "regions": ["short head", "long head", "brachialis"],
      "upperStim": [50, 70, 90], 
      "lowerStim": [20, 40, 60],
      "compounds": [],
      "isolations": ["incline curl", "preacher curl", "dumbell curl", "cable curl", "concentration curl", "barbell curl", "machine curl", "machine preacher curl"], 
    }, 
    "triceps": {
      "regions": ["long head", "medial head", "lateral head"],
      "upperStim": [50, 70, 90], 
      "lowerStim": [20, 40, 60],
      "compounds": [],
      "isolations": ["tricep pushdown", "cable overhead extension", "skullcrusher", "crossbody extension", "machine tricep extension"], 
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
    10: {
      "k": 1.2,
      "RPE0": 7.5
    }, 
    8: {
      "k": 1.1, 
      "RPE0": 7.0
    }, 
    6: {
      "k": 1.0, 
      "RPE0": 6.5
    }, 
    4: {
      "k": 0.9, 
      "RPE0": .6
    }, 
    2: {
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
    u: "Upper Lower",
    b: "Body Part Split", 
    a: "Arnold Split",
    p: "Push Pull Legs", 
    b1: "Body Part Split 1",
    b2: "Body Part Split 2",
    b3: "Body Part Split 3", 
    p1: "Push Pull Legs 1", 
    p2: "Push Pull Legs 2", 
    p3: "Push Pull Legs 3", 
    a1: "Arnold Split 1", 
    a2: "Arnold Split 2", 
    a3: "Arnold Split 3",
    u1: "Upper Lower 1", 
    u2: "Upper Lower 2",
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
        {type: 'curl-0', lowerRep: 8, upperRep: 12}, 
        {type: 'curl-1', lowerRep: 8, upperRep: 12},  
        {type: 'curl-1', lowerRep: 8, upperRep: 12}, 
        {type: 'curl-1', lowerRep: 8, upperRep: 12},  
      ], 
      order: [0, 1, 2, 3],
    }, 
    triceps: {
      seq: [
        {type: 'extension-0', lowerRep: 8, upperRep: 12}, 
        {type: 'extension-1', lowerRep: 8, upperRep: 12},  
        {type: 'extension-1', lowerRep: 8, upperRep: 12}, 
        {type: 'extension-1', lowerRep: 8, upperRep: 12},  
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
    "knee-flexion-1": ["leg press", "hack squat", "front squat","barbell squat",],
    "knee-flexion-2": ["leg press", "bulgarian split squat", "smith machine squat"],
    "hip-extension-1": ["deadlift"],
    "hip-extension-2": ["barbell romanian deadlift", "barbell hip thrust", "dumbell romanian deadlift"],
    "curl-1": ["dumbell hammer curl", "cable curl", "incline dumbell curl", "preacher curl", "dumbell curl", "barbell curl", "machine curl", "concentration curl"], 
    "extension-1": ["tricep pushdown", "cable overhead extension", "skullcrusher", "machine tricep extension", "crossbody extension"], 
    "fly": ["pec-dec fly", "cable fly"], 
    "back-iso": ["lat pullover", "reverse pec-dec fly", "face pulls"], 
    "leg-iso": ["leg extension", "leg curl", "adductor machine", "abductor machine"], 
    "shoulder-iso": ["dumbell lateral raise", "cable lateral raise", "cable front raise", "machine lateral raise", "dumbell front raise"], 
    "side deltoids": ["dumbell lateral raise", "cable lateral raise", "machine lateral raise"], 
    "rear deltoids": ["cable rear delt fly", "reverse pec-dec fly", "face pulls", "dumbell rear delt fly"],
    "traps": ["barbell shrugs", "machine shrugs", "dumbell shrugs", "cable shrugs"],
    "forearms": ["barbell forearm curl", "cable forearm curl"],
    "calves": ["machine calf raise", "smith machine calf raise", "dumbell calf raise", "barbell calf raise"],
    "abs": ["weighted leg raise", "weighted situps", "cable crunch", "dumbell side bend"],
  }, 
  }
  
  module.exports = staticData;