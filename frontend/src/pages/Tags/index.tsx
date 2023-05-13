import { TagsHome, TagsDetail } from '@/pages/Tags/components'
import { Route, Routes } from 'react-router-dom'

export function Tags() {
    return (
        <Routes>
            <Route index element={<TagsHome />} />
            <Route path=":slug" element={<TagsDetail />} />
        </Routes>
    )
}
