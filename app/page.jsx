import { Music, Headphones, Radio, Mic2 } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-gradient-to-tr p-10 py-10 max-sm:py-px from-zinc-900 via-black to-zinc-900 min-h-screen overflow-auto text-white">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <header className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Music className="w-12 h-12 text-green-500" />
            <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Vibe Palette
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Bazı şarkılar bazı insanlar için özeldir. Sizin için özel şarkıların bir o kadar özel renklerini keşfetmeye başlayın.
          </p>
        </header>


        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-8">
            <div className="flex items-start gap-4 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-green-500/50 transition-all">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Headphones className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Şu An Çalıyor</h3>
                <p className="text-gray-400">
                  Dinlediğiniz şarkıyı gerçek zamanlı olarak görün ve ona özel renge anlık erişin.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-green-500/50 transition-all">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Radio className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  En Çok Dinlenenler
                </h3>
                <p className="text-gray-400">
                  Müzik zevkinizi analiz edin, en çok dinlediğiniz şarkılara özgün ortak bir renk elde edin.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-green-500/50 transition-all">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Mic2 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Playlistler Özeldir
                </h3>
                <p className="text-gray-400">
                  Playlistlerinizi görüntüleyin, size özel şarkıları içeren çalma listeleri için özel renkler keşfedin.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
                  <Music className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  Başlamaya Hazır mısınız?
                </h2>
                <p className="text-gray-400">
                  Spotify hesabınızla giriş yaparak Vibe Palette'i kullanmaya başlayın
                </p>
              </div>

              <button
                className="w-full py-4 px-6 max-sm:px-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-green-500/50 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Music className="w-6 h-6" />
                Spotify ile Giriş Yap
              </button>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-500 text-center">
                  Giriş yaparak{" "}
                  <a href="#" className="text-green-500 hover:text-green-400">
                    Kullanım Koşullarını
                  </a>{" "}
                  ve{" "}
                  <a href="#" className="text-green-500 hover:text-green-400">
                    Gizlilik Politikasını
                  </a>{" "}
                  kabul etmiş olursunuz
                </p>
              </div>
            </div>
          </div>
        </div>
        <footer className="text-center text-gray-500 text-sm">
          <p>Bu uygulama Spotify Web API kullanarak oluşturulmuştur</p>
          <p className="mt-2">
            Spotify ve Spotify logosu Spotify AB'nin ticari markalarıdır
          </p>
        </footer>
      </div>

    </main>
  );
}
