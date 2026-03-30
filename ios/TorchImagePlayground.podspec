require 'json'

package = JSON.parse(File.read(File.join(__dir__, '..', 'package.json')))

Pod::Spec.new do |s|
  s.name           = 'TorchImagePlayground'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.platforms      = {
    :ios => '18.2'
  }
  s.swift_version  = '5.9'
  s.source         = { git: 'https://github.com/AswinTorch/torch-image-playground' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  # Weak link ImagePlayground framework (APIs gated at iOS 18.2+ in Swift)
  s.weak_frameworks = ['ImagePlayground']

  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
  }

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
end
