import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup({  }) {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const auth = getAuth();

        const signup = () => {

                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                        // Signed up 
                        const user = userCredential.user;
                        // ...
                })
                .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                });
        }

        
}