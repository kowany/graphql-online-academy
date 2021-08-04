import queryResolvers from './query';
import mutationResolvers from './mutation';
import typesResolvers from './types';

const resolvers = {
    ...queryResolvers,
    ...mutationResolvers,
    ...typesResolvers
};


export default resolvers;