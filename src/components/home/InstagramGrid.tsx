export default function InstagramGrid() {
  const photos = ["https://lh3.googleusercontent.com/aida-public/AB6AXuB1gpbUGreD1b41T_i9Ai4lKrb8x63uPc-ZCTrThHCpnG8taRytcj34tIHrEAXGTPlIr7DJ3dn_kGndSx7tMbq0LlQEegzRYIPcy-i4--KswPsLRgj4M1EBaq0pOgabPxx20izCPX5PLHDvJ1fehJNS9HuBTl8mdymAT90Gd3py-MVYkRfI-E-eGGit0pY165txD6VNLK_lKHEmmyfg1mbDgR69WRZE1qgn-FUS9Wxwtm5YcB3hkXPT","https://lh3.googleusercontent.com/aida-public/AB6AXuDuf5MWb_abqGdRTlx6zgN664j83Qk05jB-s7uCS89A9Pz9afZz6QK40_fKCYD7YphXL-_J-Ivz05sVFnO96vFQVgbla8CvrWX-yvdss6FHMK2Tgq-z9NIQRHqfTZ5OAEIHQwyyAfTIXXfXDxbhfbGCmMW5vc-bDr-XHx8Z29lzt0pdXrzaQQUiTivNY953R2f_hD2i9V8vXRRu4JdWQIkzd18RhtPRmr4OTLA_flfEZzNVMJZyH3gL","https://lh3.googleusercontent.com/aida-public/AB6AXuBnMpJO9n3eneU6lifBC3PNCFLWulNAitl_8QXXvV9xFXaIZTc3iwxI5j18CS3mMUwAoMJQ-nSJ3qb3OmPJ046PxhijBqZly1n2cqnrB6TWWO2KDEZaZ58WKrMVSgc5qHT4ydohbOJpVv-3FNiH2pHi2DIKHDtHWkWNZd6pNDPSxVA-xcKYVmejItsPOhFXGJVyhkwwaXQnhW7zr6mesd0rwQRv1iWCgKRP68YPHsG6tx3po_pZfyhm","https://lh3.googleusercontent.com/aida-public/AB6AXuA93ngcMuC3dvhmd4ixnyBWt3HrBjs-UAW74oy75A04QBUWhd126TeQjGpYrfLibcfghfL81U03YDhKZf55sxDrgfNndXz5tUCZXJF0mfYz69Eubo2UM8-UwpNup7Jr32xx1-RIKUKznKvI_QCUu0IUudNP6DClF_My695d04MG_LFjYWUtCQY3kHH_JPIha070giP-RYK3O7kfwAnscTSffUq4E9QSNR292IOdqi9RmMgPxw-BiU4T","https://lh3.googleusercontent.com/aida-public/AB6AXuD-k197dO_cuM8UGq-yQZPh6YkfDS3lXMUtJm614E4b8PcAvec9-ZhoHdfxSkjgYkTO1L8AjnI2F36XOE4rjYI21_I3wk_cDyucmEqg7-MMh2C-dsguifXvczZERraeIh7_bvJd02EEOyUw6xHm8XcfYTr0u5yaz3CVKw7xnnfodFOC1_8lsTFA9SfOJ-B1ARg2NOKc2jUxuj2SltsFpXuH3jbcQN_TsaXNA_uzdkTCDNeEEsZ6y7N7","https://lh3.googleusercontent.com/aida-public/AB6AXuCXS_6yLbUQ55pGD8xahAMRZprnAQCWtKKL8YfK6vM1EiJDNJrkqiHal2SB8-ZWlTijETidGGvMtuSANh9IZkw3gOlt7RyERxbRf_f6FhhQZ1JdkfwKrmjq-00sNGeiX7u2MVPAQiYyS2vLPj1QpbncBYx-jET4CdgkjgLW__byC5mbwzWk5seyss_fRghZrpaXEfdNcOZGUGOv012RLEzCGRzZKUvLpp9A8r9R7b_H5R06akm_hFzu"];
  return (
    <section className="w-full py-space-xl bg-background-base">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
          <div><span className="font-label-caps text-label-caps uppercase text-primary-container tracking-widest">Community Rituals</span><h2 className="font-headline-lg text-headline-lg text-text-heading mt-1">@nutraciti on Instagram</h2><p className="font-body-md text-body-md text-on-surface-variant mt-1">Join 120,000+ mindful skincare lovers sharing their daily glow.</p></div>
          <div className="mt-4 md:mt-0"><a className="inline-flex items-center gap-2 px-space-md py-space-sm border border-secondary text-secondary rounded font-button-text text-button-text uppercase tracking-wider hover:bg-surface-container hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-[18px]">photo_camera</span> Follow @nutraciti</a></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-space-sm">
          {photos.map((src, i) => (
            <a key={i} className="group relative aspect-square rounded overflow-hidden bg-surface-card block" href="#">
              <img alt={`Nutraciti community photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={src} />
              <div className="absolute inset-0 bg-text-heading/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-surface-container-lowest"><span className="material-symbols-outlined text-[24px]">favorite</span></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
