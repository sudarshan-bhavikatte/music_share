"use client"
import { signIn, signOut, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MusicIcon, PlusCircleIcon, HeadphonesIcon, UsersIcon } from "lucide-react"
import Link from "next/link"
import { Session } from "inspector/promises"
import Redirect from "./Redirect"

export default function MusicLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Redirect/>
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Button className="flex items-center justify-center">
            <MusicIcon className="h-6 w-6 text-gray-800" />
            <span className="ml-2 text-lg font-bold text-gray-800">MusicShare</span>
          </Button>
          <nav className="flex gap-4 sm:gap-6">
            <Button className="text-sm font-medium hover:text-blue-500 transition-colors" >
              Features
            </Button>
            <Button className="text-sm font-medium hover:text-blue-500 transition-colors" >
              About
            </Button>
            <Button className="text-sm font-medium hover:text-blue-500 transition-colors" onClick={() => signIn()}>
              Sign In
            </Button>
            
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-900 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Share Your Music with the World
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Upload, discover, and connect through the universal language of music.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-blue-500 text-white hover:bg-blue-600">Get Started</Button>
                <Button variant="outline" className="border-gray-300 text-gray-300 hover:bg-gray-800">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-800">
              Why Choose MusicShare?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <PlusCircleIcon className="h-12 w-12 mb-4 text-blue-500" />
                <h3 className="text-xl font-bold mb-2 text-gray-800">Easy Uploads</h3>
                <p className="text-gray-600">Share your music with just a few clicks. Support for all popular formats.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <HeadphonesIcon className="h-12 w-12 mb-4 text-blue-500" />
                <h3 className="text-xl font-bold mb-2 text-gray-800">Discover New Music</h3>
                <p className="text-gray-600">Explore a vast library of tracks from artists around the globe.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <UsersIcon className="h-12 w-12 mb-4 text-blue-500" />
                <h3 className="text-xl font-bold mb-2 text-gray-800">Connect with Artists</h3>
                <p className="text-gray-600">Follow your favorite artists and connect with fellow music lovers.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-800">
              Add Your Music
            </h2>
            <div className="max-w-md mx-auto space-y-4">
              <Input type="text" placeholder="Track Title" className="border-gray-300 focus:border-blue-500" />
              <Input type="text" placeholder="Artist Name" className="border-gray-300 focus:border-blue-500" />
              <div className="flex items-center space-x-2">
                <Input type="file" id="music-file" className="hidden" />
                <Button asChild className="w-full bg-gray-800 hover:bg-gray-900 text-white">
                  <label htmlFor="music-file" className="cursor-pointer">
                    Choose File
                  </label>
                </Button>
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Upload Track</Button>
              <p className="text-sm text-gray-500 text-center">
                By uploading, you agree to our Terms of Service and that you have permission to share this music.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-white border-t">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">© 2024 MusicShare. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link className="text-xs hover:underline underline-offset-4 text-gray-600" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4 text-gray-600" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}