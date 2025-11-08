<h2>🚀 ProjectAPIFront: Kurulum ve Çalıştırma Rehberi</h2>

<p>Bu proje, React tabanlı ve Vite.js ile oluşturulmuş bir modern web uygulamasıdır. Projeyi çalıştırmak için bilgisayarınızda <strong>Node.js</strong> ve <strong>Git</strong> kurulu olmalıdır.</p>

<hr>

<h3>1. Adım: Gerekli Araçların Kurulumu</h3>

<ol>
<li><strong>Git:</strong> Proje dosyalarını GitHub'dan indirmek (klonlamak) için gereklidir.</li>
<li><strong>Node.js (ve npm):</strong> Projenin bağımlılıklarını yönetmek ve projeyi çalıştırmak için gereklidir. Node.js'i <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">resmi web sitesinden</a> indirip kurabilirsiniz. (npm, Node.js ile birlikte otomatik olarak kurulur).</li>
</ol>

<h3>2. Adım: Projenin Klonlanması (İndirilmesi)</h3>

<p>Terminalinizi (Komut İstemi, PowerShell veya Terminal) açın ve projenin kurulmasını istediğiniz dizine gidin. Ardından aşağıdaki <code>git clone</code> komutunu çalıştırın:</p>

<pre><code class="language-bash">git clone https://github.com/hdprogramming/ProjectAPIFront.git</code></pre>

<p>Bu komut, <code>ProjectAPIFront</code> adında yeni bir klasör oluşturacak ve tüm proje dosyalarını bu klasörün içine indirecektir.</p>

<h3>3. Adım: Proje Dizinine Girme</h3>

<p>Dosyaları indirdikten sonra, projenin ana dizinine girmeniz gerekir:</p>

<pre><code class="language-bash">cd ProjectAPIFront</code></pre>

<p>Bundan sonraki tüm komutları bu dizin içindeyken çalıştıracaksınız.</p>

<h3>4. Adım: Bağımlılıkların Yüklenmesi</h3>

<p>Aşağıdaki komut, <code>package.json</code> dosyasını okur ve gerekli tüm paketleri <code>node_modules</code> adlı bir klasöre indirir:</p>

<pre><code class="language-bash">npm install</code></pre>

<blockquote>
<p><strong>Alternatif (Eğer Yarn kullanıyorsanız):</strong><br>
Eğer sisteminizde <code>npm</code> yerine <code>yarn</code> paket yöneticisi kuruluysa, <code>yarn install</code> veya sadece <code>yarn</code> komutunu da kullanabilirsiniz.</p>
</blockquote>

<h3>5. Adım: Projeyi Çalıştırma (Geliştirme Modu)</h3>

<p>Tüm paketler yüklendikten sonra, projeyi yerel geliştirme sunucusunda çalıştırmaya hazırsınız. Vite projeleri için standart başlatma komutu şudur:</p>

<pre><code class="language-bash">npm run dev</code></pre>

<p>Terminalde gösterilen <code>localhost</code> adresini (genellikle <code>http://localhost:5173/</code>) kopyalayıp tarayıcınızda açarak projeyi canlı olarak görebilirsiniz.</p>

<h3>6. Adım: Yapılandırma (API Adresi)</h3>

<p class="warning">
<strong>Önemli:</strong> Bu adımı yapmazsanız, uygulama backend servisine bağlanamaz ve düzgün çalışmaz.
</p>

<p>Proje kodunu bir kod editörü (örn: VS Code) ile açın.</p>
<p><code>src/context/AuthContext.jsx</code> dosyasına gidin (eğer dosya yolu farklıysa proje yapısını incelemeniz gerekebilir).</p>

<p>Dosya içinde aşağıdaki satırları bulun:</p>
<div class="config-code">
<code>export const domain ="&lt;serveradresi&gt;";</code><br>
<code>export const apidomain = "&lt;serveradresi&gt;/api";</code>
</div>

<p>Buradaki <code>domain</code> ve <code>apidomain</code> kısmında bulunan <code>"&lt;serveradresi&gt;"</code> değerini, kendi çalışan backend servisinizin adresi ile değiştirin.</p>

<p><strong>Örnek:</strong> Eğer backend servisiniz <code>http://localhost:8000</code> adresinde çalışıyorsa:</p>
<div class="config-code">
<code>export const domain ="http://localhost:8000";</code><br>
<code>export const apidomain = "http://localhost:8000/api";</code>
</div>
<hr>

<h3>Ek Bilgiler: Diğer Yaygın Komutlar</h3>

<p>Proje üzerinde çalışırken veya projeyi yayınlamaya hazırlarken ihtiyaç duyabileceğiniz diğer iki standart Vite komutu:</p>

<ul>
<li>
<strong>Production (Canlı) Sürümünü Oluşturma:</strong><br>
Projeyi tamamladığınızda ve bir sunucuya yüklemek istediğinizde, optimize edilmiş, küçültülmüş dosyaları oluşturmak için bu komutu kullanırsınız:
<pre><code class="language-bash">npm run build</code></pre>
<p>Bu komut, projenin canlı sürümünü içeren bir <code>dist</code> klasörü oluşturur.</p>
</li>
<li>
<strong>Production Sürümünü Yerelde Önizleme:</strong><br>
<code>build</code> komutuyla oluşturduğunuz <code>dist</code> klasörünün canlıda nasıl görüneceğini test etmek için bu komutu kullanabilirsiniz:
<pre><code class="language-bash">npm run preview</code></pre>
</li>
</ul>

</body>
</html>

    <p>Harika bir proje seçimi. Bahsettiğiniz <code>ProjectAPIFront</code> (React ve Vite.js) gibi modern bir frontend projesini yerel bilgisayarınızda kurmak ve çalıştırmak için izlemeniz gereken standart adımları sizin için detaylı bir şekilde hazırladım.</p>
    
    <p>Bu rehber, projeyi GitHub'dan indirip çalıştırmaya başlamanızı sağlayacaktır.</p>
    
    <h2>🚀 ProjectAPIFront: Kurulum ve Çalıştırma Rehberi</h2>
    
    <p>Bu proje, React tabanlı ve Vite.js ile oluşturulmuş bir modern web uygulamasıdır. Projeyi çalıştırmak için bilgisayarınızda <strong>Node.js</strong> ve <strong>Git</strong> kurulu olmalıdır.</p>
    
    <hr>
    
    <h3>1. Adım: Gerekli Araçların Kurulumu</h3>
    
    <ol>
        <li><strong>Git:</strong> Proje dosyalarını GitHub'dan indirmek (klonlamak) için gereklidir.</li>
        <li><strong>Node.js (ve npm):</strong> Projenin bağımlılıklarını yönetmek ve projeyi çalıştırmak için gereklidir. Node.js'i <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">resmi web sitesinden</a> indirip kurabilirsiniz. (npm, Node.js ile birlikte otomatik olarak kurulur).</li>
    </ol>
    
    <h3>2. Adım: Projenin Klonlanması (İndirilmesi)</h3>
    
    <p>Terminalinizi (Komut İstemi, PowerShell veya Terminal) açın ve projenin kurulmasını istediğiniz dizine gidin. Ardından aşağıdaki <code>git clone</code> komutunu çalıştırın:</p>
    
    <pre><code class="language-bash">git clone https://github.com/hdprogramming/ProjectAPIFront.git</code></pre>
    
    <p>Bu komut, <code>ProjectAPIFront</code> adında yeni bir klasör oluşturacak ve tüm proje dosyalarını bu klasörün içine indirecektir.</p>
    
    <h3>3. Adım: Proje Dizinine Girme</h3>
    
    <p>Dosyaları indirdikten sonra, projenin ana dizinine girmeniz gerekir:</p>
    
    <pre><code class="language-bash">cd ProjectAPIFront</code></pre>
    
    <p>Bundan sonraki tüm komutları bu dizin içindeyken çalıştıracaksınız.</p>
    
    <h3>4. Adım: Bağımlılıkların Yüklenmesi</h3>
    
    <p>Aşağıdaki komut, <code>package.json</code> dosyasını okur ve gerekli tüm paketleri <code>node_modules</code> adlı bir klasöre indirir:</p>
    
    <pre><code class="language-bash">npm install</code></pre>
    
    <blockquote>
        <p><strong>Alternatif (Eğer Yarn kullanıyorsanız):</strong><br>
        Eğer sisteminizde <code>npm</code> yerine <code>yarn</code> paket yöneticisi kuruluysa, <code>yarn install</code> veya sadece <code>yarn</code> komutunu da kullanabilirsiniz.</p>
    </blockquote>
    
    <h3>5. Adım: Projeyi Çalıştırma (Geliştirme Modu)</h3>
    
    <p>Tüm paketler yüklendikten sonra, projeyi yerel geliştirme sunucusunda çalıştırmaya hazırsınız. Vite projeleri için standart başlatma komutu şudur:</p>
    
    <pre><code class="language-bash">npm run dev</code></pre>
    
    <p>Terminalde gösterilen <code>localhost</code> adresini (genellikle <code>http://localhost:5173/</code>) kopyalayıp tarayıcınızda açarak projeyi canlı olarak görebilirsiniz.</p>

    <h3>6. Adım: Yapılandırma (API Adresi)</h3>
    
    <p class="warning">
        <strong>Önemli:</strong> Bu adımı yapmazsanız, uygulama backend servisine bağlanamaz ve düzgün çalışmaz.
    </p>

    <p>Proje kodunu bir kod editörü (örn: VS Code) ile açın.</p>
    <p><code>src/context/AuthContext.jsx</code> dosyasına gidin (eğer dosya yolu farklıysa proje yapısını incelemeniz gerekebilir).</p>
    
    <p>Dosya içinde aşağıdaki satırları bulun:</p>
    <div class="config-code">
        <code>export const domain ="&lt;serveradresi&gt;";</code><br>
        <code>export const apidomain = "&lt;serveradresi&gt;/api";</code>
    </div>
    
    <p>Buradaki <code>domain</code> ve <code>apidomain</code> kısmında bulunan <code>"&lt;serveradresi&gt;"</code> değerini, kendi çalışan backend servisinizin adresi ile değiştirin.</p>
    
    <p><strong>Örnek:</strong> Eğer backend servisiniz <code>http://localhost:8000</code> adresinde çalışıyorsa:</p>
    <div class="config-code">
        <code>export const domain ="http://localhost:8000";</code><br>
        <code>export const apidomain = "http://localhost:8000/api";</code>
    </div>
    <hr>
    
    <h3>Ek Bilgiler: Diğer Yaygın Komutlar</h3>
    
    <p>Proje üzerinde çalışırken veya projeyi yayınlamaya hazırlarken ihtiyaç duyabileceğiniz diğer iki standart Vite komutu:</p>
    
    <ul>
        <li>
            <strong>Production (Canlı) Sürümünü Oluşturma:</strong><br>
            Projeyi tamamladığınızda ve bir sunucuya yüklemek istediğinizde, optimize edilmiş, küçültülmüş dosyaları oluşturmak için bu komutu kullanırsınız:
            <pre><code class="language-bash">npm run build</code></pre>
            <p>Bu komut, projenin canlı sürümünü içeren bir <code>dist</code> klasörü oluşturur.</p>
        </li>
        <li>
            <strong>Production Sürümünü Yerelde Önizleme:</strong><br>
            <code>build</code> komutuyla oluşturduğunuz <code>dist</code> klasörünün canlıda nasıl görüneceğini test etmek için bu komutu kullanabilirsiniz:
            <pre><code class="language-bash">npm run preview</code></pre>
        </li>
    </ul>

</body>
</html>
