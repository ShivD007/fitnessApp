const hybridSetSchema = new mongoose.Schema({

    sets: [{
        reps: {
            type: Number,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        duration: {
            type: Number, // Optional, if applicable for each set
        }
    }]

})



const exerciseSetSchema = new mongoose.Schema({

    reps: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number, // Optional, if applicable for each set
    }

})




export { exerciseSetSchema, hybridSetSchema }