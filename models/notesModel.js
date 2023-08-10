const mongoose = require('mongoose');

const notesSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, "Please enter a product name"]
        },
        notes:{
            type: String,
            required: true,
        },
        selectedTag:{
            type: Number,
            required: true,
            default: 1,
        },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true
    }
)

const Notes = mongoose.model('Note',notesSchema);

module.exports = Notes;

// export type ChipData = {
//     id: string;
//     title: string;
//     color: string;
//     isSelected?: boolean;
//   };
  
//   export type DiaryData = {
//     id: number;
//     date: Date | string;
//     createdAt: Date;
//     selectedTags: ChipData;
//     title: string;
//     notes: string;
//   };