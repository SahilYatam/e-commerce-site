
const AuthLayout = ({title, children}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-md">
            <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
                {title}
            </h1>
            {children}
        </div>
    </div>
  )
}

export default AuthLayout