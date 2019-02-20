
module.exports = (sequelize, DataTypes) => {
    const Exercise = sequelize.define("exercise", {
        muscle_group: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
          },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING,
            
        }
          
    })
    return Exercise;
}
