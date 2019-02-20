


module.exports = (sequelize, DataTypes) => {
    return sequelize.define("workout", {
        workouts: DataTypes.ARRAY(DataTypes.INTEGER),
        time: DataTypes.INTEGER,
        comments: DataTypes.STRING,
        owner: DataTypes.INTEGER
    });
}