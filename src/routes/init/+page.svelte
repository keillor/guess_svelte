<script lang="ts">
    import { columns, type Payment } from "$lib/gameElements/CardSetTable/columns";
	import DataTable from "$lib/gameElements/CardSetTable/data-table.svelte";
	import { CreateCharacter } from "$lib/models/CreateCharacter.svelte";
    /* const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com"
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com"
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com"
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com"
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com"
    }
  ]; */
  const results: any = [{
	  setName: 'Useless!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: 'asdfg!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: 'xcvb!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: 'uyjkh!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: '3456!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: 'fd!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: 'yfrghjn!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: '5346terygfd!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: 'utdhjyf!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: 'swr46yjt!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: '124!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: 'w45estuh!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: 'ukythjydfgt!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: 'sredyj!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: 'azetjd!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: 'aezhtrdf!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: 'swrgersdg!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: 'liutyhsgdb!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: 'p980oity7wts!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  },{
	  setName: 'poi;l.jk,mfgbh!',
	  characters: [new CreateCharacter('Keillor', 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg')],
	  userId: 'SRwG87lpHWPyU0AE72fNHVsK1F03',
	  docId: '4L7hCt92hOIVhE1RQ9RY',
  }]
  const { data } = $props();
</script>
 
<div class='flex flex-col items-center w-full'>
    <DataTable data={results} {columns} />
</div>