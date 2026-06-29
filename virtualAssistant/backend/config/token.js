import jwt from 'jsonwebtoken';
const genToken = async (UserId)=>{
    try{
      const token = jwt.sign({ userId: UserId }, process.env.JWT_SECRET, { expiresIn: '10d' });
      return token;
    }
    catch(error){
      console.log(error);
    }
}
export default genToken;