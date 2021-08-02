
const queryResolvers = {
    Query: {
        hello(): string {
            return 'Hola mundo';
        },
        helloWithName( _: object, args: { name: string },
            __: object, info: object ): string {
            console.log( info )
            return `Hola ${args.name}, bienvenido/a al curso graphQL`
        },
        peopleNumber(): number {
            return 1
        }
    }
};

export default queryResolvers;