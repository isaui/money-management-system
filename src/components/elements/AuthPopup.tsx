import { useEffect, useRef, useState } from "react"
import { IAuthPopup } from "./interface/IAuthPopup"
import { IoAddCircle, IoCloseCircle } from "react-icons/io5"
import Stack from "./Stack"
import TextField from "./TextField"
import { BiUserCircle } from "react-icons/bi"
import { CgPassword } from "react-icons/cg"
import { GrAddCircle } from "react-icons/gr"
import axios from "axios"
import { toast } from "react-toastify"
import { useAuth } from "../contexts/AuthContext"
import { IUser } from "../contexts/interface/IUser"

const AuthPopup : React.FC<IAuthPopup> = ({isLoginDisplayInit, onSubmit ,onCancel,}) => {
    const {signInUser} = useAuth();
    const [isLoginDisplay, setIsLoginDisplay] = useState<boolean>(isLoginDisplayInit)
    const [profilePhotoDisplay, setProfilePhotoDisplay] = useState<boolean>(false) 
    const [profilePhoto ,setProfilePhoto] = useState<string>('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
    const username = useRef<string>('');
    const password = useRef<string>('');
    const registerUsername = useRef<string>('');
    const registerPassword = useRef<string>('');
    const registerPasswordConfirm = useRef<string>('');
    const registerFullname = useRef<string>('');
    const profileRef = useRef<HTMLInputElement>(null);
    const popupRef = useRef<HTMLDivElement>(null)

    const [render, setRender] = useState<boolean>(false)

    const renderLayer = () => {
        setRender(prevState => !prevState);
    };

    useEffect(()=>{
        username.current = ''
        password.current = ''
        registerUsername.current = ''
        registerFullname.current = ''
        registerPassword.current = ''
        registerPasswordConfirm.current = ''
        setProfilePhoto('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
    },[render])
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                renderLayer()
                onCancel()
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    

    const uploadProfile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(profileRef &&  profileRef.current){
            const file = e.target.files && e.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("image", file);
                toast("Mengupload foto profil...")
                const res = await axios.post("/api/upload", formData,  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  });
                console.log(res.data)
                setProfilePhoto(res.data.base64)
            }
        }
    }

    const determineAction = async () =>{
            if(!isLoginDisplay && !profilePhotoDisplay){
                setProfilePhotoDisplay(true)
            }
            if(!isLoginDisplay && profilePhotoDisplay){
                await register()
            }
            if(isLoginDisplay){
                await login()
            }
    }

    const validateLogin = () => {
        if(username.current.trim().length == 0){
            toast.error("Username tidak boleh kosong")
            return false;
        }
        if(password.current.trim().length == 0){
            toast.error("Password tidak boleh kosong")
            return false;
        }
        return true
    }
    const validateRegister = () =>  {
        if(registerUsername.current.trim().length == 0 ){
            toast.error("Tolong isi username yang kosong")
            return false;
        }
        if(registerPassword.current.trim().length == 0 ){
            toast.error("Tolong isi password yang kosong")
            return false;
        }
        if(registerPasswordConfirm.current.trim().length == 0 ){
            toast.error("Tolong isi password confirmation yang kosong")
            return false;
        }
        if(registerFullname.current.trim().length == 0 ){
            toast.error("Tolong isi fullname yang kosong")
            return false;
        }
        if(registerPasswordConfirm.current != registerPassword.current){
            toast.error("Password tidak sama.")
            return false;
        }
        return true;
    }

    const register = async () => {
        if(validateRegister()){
            //username, fullname, password, passwordConfirmation, profilePicture
            toast("Sedang membuat akun untuk Anda...")
            onSubmit()
            await axios.post("/api/register",{
                username:registerUsername.current,
                password:registerPassword.current,
                fullname:registerFullname.current,
                passwordConfirmation:registerPasswordConfirm.current,
                profilePicture:profilePhoto
            })
            const res =await axios.post("api/login", {
                username:registerUsername.current, password:registerPassword.current
            })
            const userData = res.data.userData
            const nwUser : IUser= {
                userId: userData.user_id,
                username: userData.username,
                fullname: userData.fullname,
                profilePicture: userData.profilepicture
            }
            toast("Anda berhasil masuk sebagai "+ nwUser.fullname)
            signInUser(nwUser)
            
        }
    }

    const login = async () => {
        try{
            if(validateLogin()){
                toast("sedang mengautentikasi...")
                onSubmit()
                const res =await axios.post("api/login", {
                    username:username.current, password:password.current
                })
                const userData = res.data.userData
                const nwUser : IUser= {
                    userId: userData.user_id,
                    username: userData.username,
                    fullname: userData.fullname,
                    profilePicture: userData.profilepicture
                }
                toast("Anda berhasil masuk sebagai "+ nwUser.fullname)
                signInUser(nwUser)
                
            }
        }catch(err:any){
            toast.error(err)
        }
    }
    const toLoginDisplay = () =>{
        setIsLoginDisplay(true)
        setProfilePhotoDisplay(false)
        registerUsername.current = ""
        registerFullname.current = ""
        registerPassword.current = ""
        registerPasswordConfirm.current = ""
    }

    const toRegisterDisplay = () =>{
        setIsLoginDisplay(false)
        username.current = ""
        password.current = ""
    }

    return <Stack className="auth-popup rounded-2xl   max-w-md min-w-72 md:min-w-[32rem] min-h-64 transition-height duration-700 ease-in-out">
            <div ref={popupRef} className="flex flex-col max-w-md min-w-72 min-h-64 md:min-w-[32rem] overflow-y-auto  p-8 transition-height duration-700 ease-in-out">
            <div className="flex items-center justify-center space-x-6 ">
                <button onClick={toLoginDisplay} className={`${isLoginDisplay? "btn-grad-canva" : "bg-indigo-800"} grow text-base normal-case rounded-md text-center px-2 py-1`}>Sign In</button>
                <button  onClick={toRegisterDisplay}className={`${!isLoginDisplay? "btn-grad-canva" : "bg-indigo-800"} grow text-base normal-case rounded-md text-center px-2 py-1`}>Sign Up</button>
            </div>
            {
                isLoginDisplay && <div className="w-full flex flex-col my-6">
                     <TextField readonly={false} textfieldKey={"Username"} value={username.current} placeholder="Masukkan username kamu" isPassword={false} icon={<BiUserCircle  className="text-xl" color="white"/>} onChangeValue={function (text: string): void {
                        username.current = text
                    } }/>
                     <TextField readonly={false} textfieldKey={"Password"} value={password.current} placeholder="Masukkan password kamu" isPassword={true} icon={<CgPassword className="text-xl" color="white"/>} onChangeValue={function (text: string): void {
                        password.current = text
                    } }/>
                </div>
            }

            {
                !isLoginDisplay && !profilePhotoDisplay && <div className="w-full flex flex-col my-6">
                    <TextField readonly={false} textfieldKey={"Username"} value={registerUsername.current} placeholder="Buat username kamu" isPassword={false} icon={<BiUserCircle className="text-xl" color="white"/>} onChangeValue={function (text: string): void {
                        registerUsername.current = text
                    } }/>
                    <TextField readonly={false} textfieldKey={"Fullname"} value={registerFullname.current} placeholder="Masukkan nama kamu" isPassword={false} icon={<BiUserCircle className="text-xl" color="white"/>} onChangeValue={function (text: string): void {
                        registerFullname.current = text
                    } }/>
                    <TextField readonly={false} textfieldKey={"Password"} value={registerPassword.current} placeholder="Buat password kamu" isPassword={true} icon={<CgPassword className="text-xl" color="white"/>} onChangeValue={function (text: string): void {
                        registerPassword.current = text
                    } }/>
                    <TextField readonly={false} textfieldKey={"Password Confirmation"} value={registerPasswordConfirm.current} placeholder="Konfirmasi password kamu" isPassword={true} icon={<CgPassword className="text-xl" color="white"/>} onChangeValue={function (text: string): void {
                        registerPasswordConfirm.current = text
                    } }/>
                </div>
            }

            {
                !isLoginDisplay && profilePhotoDisplay && <div className="w-full flex flex-col my-6">
                    <div className="mb-4 font-bold">
                        <h1 className="text-center text-xl md:text-2xl">Add Photo Profile</h1>
                    </div>
                    <div className="mx-auto">
                    <Stack>
                        <img src={profilePhoto.length == 0? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" : profilePhoto}alt=""
                        className="p-1 w-36 h-36 object-cover rounded-full"
                        />
                        <div  className="ml-auto mt-2 mr-1">
                        <label htmlFor="fileInput" className="cursor-pointer">
                            <input id="fileInput" ref={profileRef} onChange={uploadProfile} type="file" accept="image/*" hidden />
                            <IoAddCircle className="text-5xl text-indigo-600" />
                        </label>
                        </div>
                    </Stack>
                    </div>
                </div>
            }
            <div className="mt-auto flex text-center justify-center space-x-6 ">
                {profilePhotoDisplay && <button onClick={()=>{
                    setProfilePhotoDisplay(false)
                }} className="px-4 py-2 auth-popup-btn w-full rounded-2xl">BACK</button>} 
                <button onClick={determineAction} className="px-4 py-2 auth-popup-btn w-full rounded-2xl">{isLoginDisplay? "SIGN IN" : !profilePhotoDisplay? "NEXT":"SIGN UP"}</button>
            </div>
            </div>
            <div className="ml-auto mt-2 mr-2">
                <button onClick={()=>{
                    renderLayer()
                    onCancel()
                }} className="text-2xl ml-auto"><IoCloseCircle/></button>
            </div>

    </Stack>
}

export default AuthPopup