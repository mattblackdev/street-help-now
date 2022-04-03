import { useForm } from 'react-hook-form'
import { ResourceType } from './api'

type CardEditFormProps = {
  resourceType: ResourceType
  setIsEditing: (isEditting: boolean) => void
}
function CardEditForm({ resourceType, setIsEditing }: CardEditFormProps) {
  const { register, handleSubmit } = useForm()
  const onSubmit = handleSubmit((data) => {
    // Call Meteor Method
    setIsEditing(false)
  })
  return (
    <form onSubmit={onSubmit} className="bg-stone-900">
      Edit {resourceType._id}
      <input
        type="submit"
        value="Submit"
        // disabled={submitting}
        className="mt-2 px-4 py-2 rounded bg-blood hover:bg-brightblood text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
      />
    </form>
  )
}
