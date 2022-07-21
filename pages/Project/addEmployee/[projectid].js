export async function getServerSideProps(context){ 
      return {
          props: {
              param: context.params.projectid,
              query: context.query.id
          }
      }
}

const Post = ({param,query}) => {

  return (
    <>
      <p>El proyecto pasado por parametro es: {param}</p>
      <p>El id pasado por parametro es: {query}</p>
    </>
  );
};

export default Post;