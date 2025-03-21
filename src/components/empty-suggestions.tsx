import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function EmptyFeedback() {
  return (
    <div className="flex h-[600px] w-full bg-gray-50">
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm">
        <div className="my-2 flex justify-center">
          <DetectiveIcon />
        </div>

        <h2 className="mb-2 text-xl font-semibold text-indigo-900">
          There is no feedback yet.
        </h2>

        <p className="mb-6 text-sm text-gray-600">
          Got a suggestion? Found a bug that needs to be squashed?
          <br />
          We love hearing about new ideas to improve our app.
        </p>

        <Button className="bg-purple-500 hover:bg-purple-600">
          <PlusIcon className="mr-1 h-4 w-4" /> Add Feedback
        </Button>
      </div>
    </div>
  )
}

function DetectiveIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="131"
      height="137"
      viewBox="0 0 131 137"
      fill="none"
    >
      <g opacity="0.5">
        <path
          d="M62.8268 19.7428C33.7105 19.7372 10.1005 43.3321 10.0874 72.4484C10.0743 101.565 33.6632 125.181 62.7794 125.201C91.8957 125.222 115.518 101.639 115.546 72.5228C115.562 58.5303 110.015 45.1053 100.126 35.2054C90.2379 25.3055 76.8193 19.7428 62.8268 19.7428Z"
          stroke="#3A4374"
          stroke-width="1.04545"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <ellipse
          cx="90.4653"
          cy="55.3186"
          rx="2.436"
          ry="3.62355"
          fill="#231F20"
        />
        <path
          d="M0.891602 56.8512L124.722 29.4462L100.362 22.3412C100.362 22.3412 87.1666 0.467961 83.6446 0.0112108C80.1225 -0.445539 16.1166 13.2062 16.1166 13.2062L12.0566 44.0216L0.891602 56.8512Z"
          fill="#3A4374"
        />
        <path
          d="M26.6726 131.048L12.6758 108.921L73.86 98.4561L78.0621 119.659L84.2739 100.131L115.576 106.312L109.212 131.048H26.6726Z"
          fill="#3A4374"
        />
        <path
          d="M105.074 83.0667L110.714 82.286L113.628 103.339C113.831 104.805 112.807 106.158 111.341 106.361L111.009 106.407C109.543 106.61 108.191 105.586 107.988 104.12L105.074 83.0667H105.074Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M107.487 104.201C107.709 105.775 109.054 106.947 110.643 106.952C110.783 106.951 110.922 106.94 111.059 106.921L111.384 106.87C112.224 106.76 112.984 106.317 113.495 105.642C114.006 104.967 114.226 104.115 114.104 103.277L111.212 82.2262C111.198 82.0924 111.128 81.9707 111.019 81.8913C110.912 81.8089 110.777 81.7724 110.643 81.7898L105.01 82.5713C104.733 82.6081 104.538 82.8624 104.574 83.1397L107.487 104.201ZM108.492 104.059L105.65 83.5051L110.278 82.9164L113.12 103.47C113.283 104.655 112.457 105.749 111.273 105.916H110.938C109.751 106.073 108.659 105.244 108.492 104.059Z"
          fill="#3A4374"
        />
        <rect
          x="100.742"
          y="64.4839"
          width="9.18575"
          height="20.7872"
          transform="rotate(-7.88 100.742 64.4839)"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M103.285 85.4945C103.374 85.558 103.48 85.5933 103.589 85.596L103.65 85.5859L112.785 84.3273C113.062 84.2904 113.258 84.0362 113.222 83.7589L110.369 63.1645C110.354 63.0302 110.285 62.9077 110.178 62.8254C110.071 62.743 109.935 62.7079 109.801 62.7281L100.666 63.9867C100.534 64.0072 100.415 64.076 100.331 64.1795C100.251 64.2873 100.218 64.4227 100.24 64.5551L103.092 85.1596C103.103 85.2943 103.174 85.4169 103.285 85.4945ZM104.026 84.51L101.316 64.9205L109.436 63.804L112.146 83.3935L104.026 84.51Z"
          fill="#3A4374"
        />
        <rect
          x="105.568"
          y="99.3416"
          width="9.18575"
          height="36.1543"
          rx="3.248"
          transform="rotate(-7.88 105.568 99.3416)"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M109.568 132.022C109.826 133.877 111.411 135.258 113.283 135.26L113.79 135.27L116.47 134.895C118.516 134.606 119.944 132.719 119.667 130.672L115.607 101.237C115.324 99.1884 113.434 97.757 111.385 98.0399L108.705 98.4053C107.721 98.5442 106.831 99.0658 106.229 99.8568C105.627 100.651 105.368 101.652 105.508 102.638L109.568 132.022ZM111.527 99.0143C111.652 99.0043 111.777 99.0043 111.902 99.0143L111.872 99.0245C113.235 99.0318 114.385 100.039 114.572 101.389L118.632 130.824C118.813 132.306 117.775 133.659 116.297 133.869L113.618 134.245C112.138 134.42 110.788 133.385 110.573 131.91L106.513 102.475C106.404 101.755 106.595 101.022 107.041 100.445C107.475 99.8621 108.126 99.478 108.847 99.3797L111.527 99.0143Z"
          fill="#3A4374"
        />
        <circle cx="104.564" cy="58.6072" r="24.3904" fill="white" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M79.6722 59.7295C80.2774 73.0274 91.2316 83.4991 104.543 83.5051C105.704 83.5046 106.864 83.4266 108.015 83.2717C121.613 81.348 131.096 68.7924 129.228 55.1866C127.405 42.0003 115.537 32.5777 102.281 33.7929C89.0246 35.0081 79.067 46.4316 79.6722 59.7295ZM101.244 34.9374C102.338 34.7876 103.44 34.713 104.543 34.7141H104.584C116.48 34.7656 126.533 43.5472 128.183 55.3287C129.508 64.9018 124.936 74.3306 116.598 79.2181C108.261 84.1056 97.8002 83.4891 90.0946 77.6561C82.3889 71.8231 78.9559 61.9225 81.3967 52.5714C83.8374 43.2203 91.6711 36.2604 101.244 34.9374Z"
          fill="#3A4374"
        />
        <circle cx="104.564" cy="58.6072" r="19.8128" fill="white" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M84.2652 59.3276C84.6425 70.2601 93.6144 78.9276 104.553 78.9275C105.487 78.9286 106.42 78.8641 107.345 78.7346C118.18 77.2304 125.874 67.4113 124.745 56.5309C123.615 45.6504 114.067 37.6218 103.154 38.3757C92.241 39.1297 83.8879 48.3952 84.2652 59.3276ZM101.864 39.5252C102.755 39.4041 103.654 39.343 104.553 39.3425C114.942 39.3646 123.446 47.6114 123.787 57.9942C124.128 68.3769 116.184 77.1641 105.819 77.8681C95.4547 78.5721 86.3951 70.9399 85.329 60.6064C84.263 50.2729 91.5738 40.9519 101.864 39.5252Z"
          fill="#3A4374"
        />
        <path
          d="M127.858 113.59C126.518 111.889 124.82 110.503 122.885 109.53C117.069 106.485 110.4 106.586 104.28 108.515C102.108 109.205 97.8953 110.189 97.672 113.072C97.6886 114.253 98.476 115.283 99.6107 115.61C100.721 115.898 101.881 115.943 103.011 115.742C101.401 115.698 99.8105 116.099 98.413 116.899C97.1036 117.822 96.383 119.842 97.4589 121.07C97.9344 121.581 98.5538 121.935 99.2351 122.085C100.716 122.493 102.282 122.471 103.752 122.024C102.162 122.329 100.612 122.816 99.1336 123.476C98.2404 123.872 97.2457 124.572 97.3472 125.506C97.4487 126.44 98.3622 126.866 99.1945 127.15C100.946 127.751 102.775 128.093 104.625 128.165C103.028 128.455 101.518 129.104 100.21 130.063C98.1795 131.768 98.1795 135.006 100.93 135.93C101.813 136.188 102.732 136.294 103.65 136.245C111.77 136.245 121.494 135.23 126.995 128.47C129.703 125.306 130.675 121.011 129.594 116.99C129.218 115.764 128.63 114.613 127.858 113.59Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M100.768 136.387C101.683 136.655 102.637 136.768 103.589 136.722L103.62 136.742C111.659 136.732 121.626 135.818 127.381 128.784C130.204 125.491 131.212 121.013 130.071 116.828C129.666 115.553 129.044 114.359 128.234 113.295C126.853 111.518 125.095 110.069 123.087 109.053C117.627 106.272 110.877 105.896 104.097 108.038L103.447 108.231C103.425 108.237 103.402 108.244 103.379 108.251C100.963 108.992 97.3652 110.095 97.1339 113.031C97.1225 114.308 97.8907 115.462 99.0726 115.945C98.714 116.087 98.3734 116.271 98.0576 116.493C97.1649 117.136 96.5715 118.114 96.4133 119.203C96.2942 119.985 96.5117 120.782 97.0121 121.395C97.5516 121.983 98.2613 122.388 99.0421 122.552C99.2224 122.606 99.4053 122.65 99.5902 122.684L98.8696 122.989C97.4689 123.648 96.6873 124.704 96.8396 125.577C96.9918 126.45 97.6719 127.14 99.0218 127.607C100.013 127.952 101.032 128.213 102.067 128.388C101.27 128.685 100.529 129.114 99.8744 129.657C98.6932 130.652 98.1162 132.191 98.3519 133.717C98.603 134.984 99.5316 136.011 100.768 136.387ZM99.3365 123.872C100.397 123.395 101.498 123.011 102.625 122.725C103.051 122.675 103.472 122.59 103.884 122.471C104.139 122.388 104.289 122.124 104.229 121.862C104.164 121.6 103.905 121.435 103.64 121.486C103.234 121.568 102.818 121.659 102.412 121.76C101.393 121.894 100.359 121.825 99.3669 121.557C98.7875 121.439 98.2571 121.149 97.8444 120.725C97.5311 120.326 97.3986 119.815 97.479 119.314C97.5971 118.499 98.0401 117.767 98.7072 117.284C99.5897 116.726 100.598 116.398 101.641 116.33C101.876 116.325 102.108 116.299 102.337 116.273C102.583 116.246 102.825 116.219 103.062 116.219C103.335 116.187 103.536 115.946 103.518 115.67C103.487 115.399 103.253 115.197 102.98 115.204C102.951 115.206 102.921 115.208 102.892 115.21C102.472 115.238 102.035 115.268 101.59 115.315C100.976 115.355 100.359 115.279 99.7729 115.092C98.8554 114.834 98.2082 114.014 98.1692 113.062C98.3517 110.79 101.614 109.806 103.766 109.156L103.772 109.154L104.432 108.951C110.958 106.921 117.424 107.276 122.651 109.966C124.526 110.911 126.167 112.264 127.452 113.925C128.194 114.893 128.764 115.981 129.137 117.142C130.172 121.004 129.229 125.127 126.62 128.155C121.139 134.864 111.466 135.737 103.64 135.737C102.781 135.793 101.918 135.697 101.092 135.453C100.201 135.197 99.5273 134.464 99.3466 133.555C99.1664 132.382 99.6178 131.202 100.534 130.449C101.793 129.548 103.234 128.934 104.757 128.652C105.001 128.588 105.161 128.355 105.132 128.104C105.106 127.853 104.897 127.661 104.645 127.658C102.842 127.581 101.06 127.239 99.3568 126.643C98.7072 126.429 97.9358 126.166 97.8546 125.414C97.7734 124.663 98.8594 124.085 99.3365 123.872Z"
          fill="#3A4374"
        />
        <path
          d="M71.2618 58.9929C71.2618 58.9929 83.6245 77.5674 76.1439 77.8313C68.6634 78.0952 68.0239 76.1362 68.0239 76.1362"
          fill="white"
        />
        <path
          d="M74.804 78.42C68.5313 78.42 67.6279 76.7046 67.5061 76.39C67.4185 76.1129 67.5668 75.8162 67.8411 75.7201C68.1155 75.6331 68.4091 75.7821 68.5008 76.055C68.5008 76.055 69.4143 77.6283 76.1235 77.3847C76.7911 77.4462 77.4334 77.1132 77.7678 76.5321C79.3715 73.416 73.3018 63.0833 70.8252 59.3684C70.6873 59.1284 70.7583 58.8227 70.9878 58.668C71.2172 58.5132 71.5272 58.562 71.6981 58.7797C72.642 60.2007 80.8331 72.7867 78.7016 77.0497C78.204 77.9777 77.2156 78.5351 76.1641 78.4809L74.804 78.42Z"
          fill="#3A4374"
        />
        <ellipse
          cx="105.69"
          cy="57.988"
          rx="4.4863"
          ry="7.64295"
          fill="#C0C5DC"
        />
        <ellipse
          cx="50.7892"
          cy="57.988"
          rx="3.42055"
          ry="6.18135"
          fill="#3A4374"
        />
      </g>
    </svg>
  )
}
