import Link from "next/link"

const Nav = () => {
  return (
    <div>
        <header className="bg-gray-600 text-gray-100">
            <nav className="flex justify-between items-center w-full px-10 py-4">
                <div>
                    My Site
                </div>
                <div className="flex gap-10">
                    <Link href="/">Home</Link>
                    <Link href="/CreateUser">Create User</Link>
                    <Link href="/ClientProfile">Client Profile</Link>
                    <Link href="/Profile">Profile</Link>
                    <Link href="/Public">Public</Link>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Nav