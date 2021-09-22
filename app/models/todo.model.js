module.exports = mongoose => {
    
  const Todo = mongoose.model(
    'todo',
    mongoose.Schema(
      {
        title: String,
        isDone: Boolean,
      },
      { timestamps: true }
    )
  );

  return Todo;
};
