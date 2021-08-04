import { ICourse } from './../interfaces/course.interface';
import data from './../data';


const mutationResolvers = {
    Mutation: {
        addCourse( _: object, args: { course: ICourse } ): {
            status: boolean;
            message: string;    
            item?: ICourse | undefined
        } {
            // Validar antes de introducir
            // Si existe no se puede añadir
            if ( data.courses.filter(
                (courseItem: ICourse ) => courseItem.title === args.course.title
            ).length > 0 ) {
                // Existe ese valor
                return {
                    status: false,
                    message: `Ya existe curso con el título '${args.course.title}'. Prueba con otro por favor`,
                }
            }
            // Si el título no existe se puede añadir
            const idNew = data.courses.length + 1;
            args.course.id = String(idNew);
            data.courses.push( args.course );
            return {
                status: true,
                message: `Curso con título '${args.course.title}' agregado correctamente`,
                item: args.course
            }
        },
        updateCourse( _: object, args: { course: ICourse } ): {
            status: boolean;
            message: string;    
            item?: ICourse | undefined
        } {
            // Buscar si existe el curso por título
            if ( data.courses.filter( 
                (courseItem: ICourse) => courseItem.id === args.course.id
            ).length === 0 ) {
                // No existe el valor
                return {
                    status: false,
                    message: `No existe el curso con el título '${args.course.title}'.`,
                }
            }
            // Existe ese curso, listo para actualizarlo
            for ( let i = 0; i < data.courses.length; i++ ) {
                if ( data.courses[i].id === args.course.id ) {
                    data.courses[i] = args.course
                    break;
                }
            }
            return {
                status: true,
                message: `Actualizado correctamente '${ args.course.title }'`,
                item: args.course
            }
        },
        deleteCourse( _: object, args: { id: string } ): {
            status: boolean;
            message: string;    
            // item?: ICourse | undefined
        } {
            if ( data.courses.filter( 
                (courseItem: ICourse) => courseItem.id === args.id
            ).length === 0 ) {
                return {
                    status: false,
                    message: `No existe el curso con ese ID:  '${args.id}'.`,
                }
            }
            let deleteItem = false;
            for ( let i = 0; i < data.courses.length; i++ ) {
                if ( data.courses[i].id === args.id ) {
                    deleteItem = true;
                    data.courses.splice( i, 1 );
                    break;
                }
            }
            return {
                status: deleteItem,
                message: deleteItem ? "Eliminado" : "No se ha eliminado nada"
            }

        }

        /** 
         * Todas las soluciones de las definiciones  
            addCourse( id: ID! ): Boolean
            updateCourse( id: ID! ): Boolean
            deleteCourse( id: ID! ): Boolean
         * **/

    }
}

export default mutationResolvers;