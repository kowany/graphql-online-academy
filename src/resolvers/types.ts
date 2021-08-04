import data from './../data'


const typesResolvers = {
    Data: {
        __resolveType( obj: { name: string, title: string }){
            // Only Student has a name field
            if(obj.name){
              return 'Student';
            }
            // Only Course has a title field
            if(obj.title){
              return 'Course';
            }
            return null; // GraphQLError is thrown
          },
    },
    Student: {
        website: ( root: { website: string } ) => 'kowany.'.concat( root.website ),
        /* root, args, contex, info */
        courses: ( root: { courses: Array<string> } ) => {
            return data.courses.filter( 
                ( course ) => root.courses.indexOf( course.id ) > -1
            )
        }
    },
    Course: {
        path: ( root: { path: string } ) => `https://udemy.com/course${root.path}`,
        students: ( root: { id: string } ) => {
            return data.students.filter(
                ( student ) => student.courses.indexOf( root.id ) > -1
            )
        }
    }
}



export default typesResolvers