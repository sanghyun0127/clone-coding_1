import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useEffect, useRef, useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useSession } from 'next-auth/react';

function Input() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | undefined>('');
  const [showEmojis, setShowEmojis] = useState(false);
  const filePickerRef = useRef<any>();

  const { data: session } = useSession();

  function addImageToPost(e: any) {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent: any) => {
      setSelectedFile(readerEvent.target.result);
    };
  }

  function addEmoji(e: any) {
    let sym = e.unified.split('-');
    let codesArray: any[] = [];
    sym.forEach((el: any) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  }

  async function sendPost() {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      id: session?.user.uid,
      username: session?.user.name,
      userImg: session?.user.image,
      tag: session?.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    /**
     * getDownloadURL 보다 image resize image  가 더 나중에 됨
     * 임시방편: downloadURL 에서 뒷부분 token 지우고 image => image_200x200 으로 바꿔서 저장
     */

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        const resizedImageURL =
          downloadURL.split('?alt')[0] + '_800x800?alt=media';
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: resizedImageURL,
        });
      });
    }

    setLoading(false);
    setInput('');
    setSelectedFile('');
    setShowEmojis(false);
  }

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide ${
        loading && 'opacity-60'
      }`}
    >
      <img
        src={session?.user.image || ''}
        alt=""
        className="rounded-full cursor-pointer h-11 w-11"
      />
      <div className="w-full divide-y divide-gray-700">
        <div className={`${selectedFile && 'pb-7'} ${input && 'space-y-2.5'}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            placeholder={'입력하세요'}
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
          />

          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#151515] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile('')}
              >
                <XIcon className="h-5 text-white" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="object-contain rounded-2xl max-h-80"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            <div className="icon" onClick={() => filePickerRef.current.click()}>
              <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
              <input
                hidden
                type={'file'}
                onChange={addImageToPost}
                ref={filePickerRef}
              />
            </div>

            <div className="rotate-90 icon">
              <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
              <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="icon">
              <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            {showEmojis && (
              <div className="absolute mt-[465px] ml-[-40px] max-w-[320px] rounded-[20px]">
                <Picker data={data} theme="dark" onEmojiSelect={addEmoji} />
              </div>
            )}
          </div>

          <button
            className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
            disabled={!input && !selectedFile}
            onClick={sendPost}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Input;
