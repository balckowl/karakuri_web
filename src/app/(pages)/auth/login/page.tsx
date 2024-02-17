"use client"

import TopHeader from "@/app/components/base/topHeader"
import { Button } from "@/app/components/ui/button"
import { auth } from "@/lib/firebase/client"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"


const Login = () => {

    const { data: session, status } = useSession()
    const router = useRouter()


    const googleProvider = new GoogleAuthProvider

    const signInWithGoogle = () => {

        signInWithPopup(auth, googleProvider).then((credential) => {
            return credential.user.getIdToken(true)
        }).then((idToken) => {
            signIn("credentials", { idToken, callbackUrl: '/selectLevel' })
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <TopHeader pathname='/auth/login' />
            <div className="hero mt-[70px]">
                <h2 className="text-center mb-7 text-[30px] font-bold">Login to karakuri-web</h2>
                <div className="flex justify-center">
                    <Button onClick={signInWithGoogle} className="flex gap-2 bg-white border border-black text-black hover:text-white">
                        <Image src="/images/auth/google-icon.svg" width={20} height={20} alt="google-icon" />
                        <p>Sign In with Google</p>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login