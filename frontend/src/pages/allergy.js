export default function Allergy() {

    async function onSubmit(event) {
        event.preventDefault()
     
        const formData = {}
        const form = event.target
        const data = new FormData(form)
        data.forEach((value, key) => {
          formData[key] = value
        })
        const response = await fetch('/api/submit', {
          method: 'POST',
          body: JSON.stringify(formData),
        })
        
      }


    return (
        <div>
            <h1>Add an allergy</h1>

            <form onSubmit={onSubmit}>
            <label>Allergy :</label>
            <input type="text" name="allergy" />
            <label>Private ? :</label>
            <input type="checkbox" name="isPrivate" />
            <button type="submit">Submit</button>
            </form>
        </div>

        
    )
}

